import csv
import time
from collections.abc import Iterator
from dataclasses import dataclass
from itertools import count
from typing import Callable


@dataclass
class Stage:
    number: int
    description: str
    elapsed_time: float

    def __str__(self) -> str:
        return f'\n   {self.number}: {self.description}'


class StagePrinter:
    def __init__(self, perf_counter: Callable[[], float] = time.perf_counter):
        self.stages: list[Stage] = []

        self._numbers = count(start=1)

        self._perf_counter = perf_counter
        self._elapsed: float = self._perf_counter()

    def _clock_time_elapsed(self) -> Iterator[float]:
        old_time = self._elapsed
        new_time = self._perf_counter()
        self._elapsed = new_time
        yield new_time - old_time

    def _create_stage(self, description) -> Stage:
        number = next(self._numbers)

        return Stage(
            number=number,
            description=description,
            elapsed_time=0,
        )

    def _set_elapsed_time_of_previous_stage(self):
        if len(self.stages) > 0:
            self.stages[-1].elapsed_time = next(self._clock_time_elapsed())

    def print_stage(self, description: str) -> None:
        self._set_elapsed_time_of_previous_stage()

        stage = self._create_stage(description)
        self.stages.append(stage)

        print(stage)

    def save_as_csv(self, file: str) -> None:
        with open(file, mode='w') as output_file:
            writer = csv.writer(output_file)
            writer.writerow(['Number', 'Message', 'Elapsed Time'])
            for stage in self.stages:
                writer.writerow([stage.number, stage.description, stage.elapsed_time])
