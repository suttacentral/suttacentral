from collections.abc import Iterator

import pytest

from data_loader.observability import StagePrinter, RunTime


class FakePerfCounter:
    def __init__(self,
                 start_time: float,
                 stage_time: float,
                 time_between_stages: float = 0.0,
                 increase_each_stage_by: float = 0.0):
        self._start_time = start_time
        self._stage_time = stage_time
        self._time_between_stages = time_between_stages
        self._increase_each_stage_by = increase_each_stage_by
        self._results = iter(self._result_generator())

    def _result_generator(self) -> Iterator[float]:
        result = self._start_time

        while True:
            yield result
            result += self._stage_time
            yield result
            result += self._time_between_stages
            self._stage_time += self._increase_each_stage_by


    def __call__(self) -> float:
        return next(self._results)


class TestFakePerfCounter:
    def test_starting_time(self):
        counter = FakePerfCounter(
            start_time=1.1,
            stage_time=1.0,
        )

        assert counter() == 1.1

    def test_constant_stage_time_with_no_inbetween(self):
        counter = FakePerfCounter(
            start_time=1.0,
            stage_time=2.0,
            time_between_stages=0.0,
        )

        assert counter() == 1.0
        assert counter() == 3.0
        assert counter() == 3.0
        assert counter() == 5.0

    def test_time_between_stages(self):
        counter = FakePerfCounter(
            start_time=2.0,
            stage_time=1.0,
            time_between_stages=0.2,
            increase_each_stage_by=0.0
        )

        assert counter() == 2.0
        assert counter() == 3.0
        assert counter() == 3.2
        assert counter() == 4.2

    def test_increment_stage_time(self):
        counter = FakePerfCounter(
            start_time=2.0,
            stage_time=1.0,
            time_between_stages=0.1,
            increase_each_stage_by=0.5
        )

        assert counter() == 2.0
        assert counter() == 3.0
        assert counter() == 3.1
        assert counter() == 4.6

class TestRunTime:
    def test_create_run_time(self):
        perf_counter = FakePerfCounter(
            start_time=1.0, stage_time=2.0)

        run_time = RunTime(perf_counter=perf_counter)
        run_time.start()
        run_time.end()
        assert run_time.clock_seconds == 2.0


class TestStagePrinter:
    def test_prints_one_stage(self, capsys):
        printer = StagePrinter()
        printer.print_stage('Retrieving Data Repository')
        captured = capsys.readouterr()
        assert captured.out == '\n   1: Retrieving Data Repository\n'

    def test_prints_two_stages(self, capsys):
        printer = StagePrinter()
        printer.print_stage('Retrieving Data Repository')
        printer.print_stage('Copying localization files')
        captured = capsys.readouterr()
        expected =  '\n   1: Retrieving Data Repository\n'
        expected += '\n   2: Copying localization files\n'
        assert captured.out == expected

    def test_tracks_message(self):
        printer = StagePrinter()
        printer.print_stage('Retrieving Data Repository')
        printer.print_stage('Copying localization files')
        assert printer.stages[0].description == 'Retrieving Data Repository'
        assert printer.stages[1].description == 'Copying localization files'

    def test_tracks_elapsed_time(self):
        perf_counter = FakePerfCounter(
            start_time=1.0, stage_time=2.0,
            time_between_stages=0.5, increase_each_stage_by=0.5)

        printer = StagePrinter(perf_counter=perf_counter)
        printer.print_stage('Retrieving Data Repository')
        printer.print_stage('Copying localization files')
        printer.print_stage('All done')

        assert printer.stages[0].run_time.clock_seconds == 2.0
        assert printer.stages[1].run_time.clock_seconds == 2.5
        # assert printer.stages[2].run_time.clock_seconds is None
