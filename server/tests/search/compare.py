from dataclasses import dataclass
from difflib import SequenceMatcher


@dataclass(frozen=True)
class Replaced:
    before: list[str]
    after: list[str]


@dataclass(frozen=True)
class Deleted:
    before: list[str]


@dataclass(frozen=True)
class Inserted:
    after: list[str]


def changes(before: str, after: str) -> list[Replaced | Deleted | Inserted]:
    before_lines = [line.rstrip() for line in before.splitlines()]
    after_lines = [line.rstrip() for line in after.splitlines()]
    opcodes = SequenceMatcher(None, before_lines, after_lines).get_opcodes()
    return [
        from_opcode(before_lines, after_lines, opcode)
        for opcode in opcodes
        if opcode[0] != 'equal'
    ]


def from_opcode(before, after, opcode) -> Replaced | Deleted | Inserted:
    if opcode[0] == 'replace':
        return Replaced(before[opcode[1]:opcode[2]], after[opcode[1]:opcode[2]])
    elif opcode[0] == 'delete':
        return Deleted(before[opcode[1]:opcode[2]])
    elif opcode[0] == 'insert':
        return Inserted(after[opcode[3]:opcode[4]])
    else:
        raise ValueError(f'No such opcode: {opcode}')
