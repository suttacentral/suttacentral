import csv
import time
from collections.abc import Iterator
from dataclasses import dataclass
from itertools import count
from typing import Callable


class RunTime:
    def __init__(self,
                 perf_counter: Callable[[], float] = time.perf_counter,
                 process_time: Callable[[], float] = time.process_time,
                 ):

        self._perf_counter = perf_counter
        self._process_time = process_time

        self._start_clock_time = None
        self._end_clock_time = None
        self._start_cpu_time = None
        self._end_cpu_time = None

    def start(self) -> None:
        self._start_clock_time = self._perf_counter()
        self._start_cpu_time = self._process_time()

    def end(self) -> None:
        self._end_clock_time = self._perf_counter()
        self._end_cpu_time = self._process_time()

    @property
    def clock_seconds(self) -> float | None:
        if self._start_clock_time and self._end_clock_time:
            return self._end_clock_time - self._start_clock_time
        else:
            return None

    @property
    def cpu_seconds(self) -> float | None:
        if self._start_cpu_time and self._end_cpu_time:
            return self._end_cpu_time - self._start_cpu_time
        else:
            return None


@dataclass
class Stage:
    number: int
    description: str
    run_time: RunTime

    def __str__(self) -> str:
        return f'\n   {self.number}: {self.description}'


class StagePrinter:
    def __init__(self,
                 perf_counter: Callable[[], float] = time.perf_counter,
                 process_time: Callable[[], float] = time.process_time,
                 ):

        self.stages: list[Stage] = []
        self._numbers = count(start=1)
        self._perf_counter = perf_counter
        self._process_time = process_time

    def _create_stage(self, description) -> Stage:
        number = next(self._numbers)
        run_time = RunTime(
            perf_counter=self._perf_counter,
            process_time=self._process_time,
        )
        run_time.start()

        return Stage(
            number=number,
            description=description,
            run_time=run_time,
        )

    def print_stage(self, description: str) -> None:
        if len(self.stages) > 0:
            self.stages[-1].run_time.end()

        stage = self._create_stage(description)
        self.stages.append(stage)

        print(stage)

def save_as_csv(stages: list[Stage], file: str) -> None:
    with open(file, mode='w') as output_file:
        writer = csv.writer(output_file)
        writer.writerow(['Number', 'Message', 'Clock Time (s)', 'CPU Time (s)'])
        for stage in stages:
            writer.writerow(
                [stage.number,
                 stage.description,
                 stage.run_time.clock_seconds,
                 stage.run_time.cpu_seconds])
