import pytest

from data_loader.observability import StagePrinter, clock_seconds


class FakePerfCounter:
    def __init__(self, times: list[float]):
        self._times = iter(times)

    def __call__(self) -> float:
        return next(self._times)


class TestClockSeconds:
    def test_clock_seconds(self):
        counter = FakePerfCounter([1.1, 2.3, 11.6, 11.9])
        seconds = clock_seconds(counter)
        assert next(seconds) == 1.2
        assert next(seconds) == 9.3
        assert next(seconds) == 0.3

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
        perf_counter = FakePerfCounter([1.1, 2.3, 11.6, 11.9])
        printer = StagePrinter(perf_counter=perf_counter)
        printer.print_stage('Retrieving Data Repository')
        printer.print_stage('Copying localization files')
        printer.print_stage('All done')

        assert printer.stages[0].elapsed_time == pytest.approx(1.2)
        assert printer.stages[1].elapsed_time == pytest.approx(9.3)
        assert printer.stages[2].elapsed_time == 0.0
