from compare import Replaced, changes, Deleted, Inserted

BEFORE = """\
Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua.
"""


REPLACED = """\
Lorem ipsum dolor sit amet,
consectetur CHANGED elit,
sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua.
"""


REMOVED = """\
Lorem ipsum dolor sit amet,
sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua.
"""


INSERTED = """\
Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
This line INSERTED
sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua.
"""


def test_no_change():
    assert changes(BEFORE, BEFORE) == []


def test_replacement():
    assert changes(BEFORE, REPLACED) == [
        Replaced(
            before=['consectetur adipiscing elit,',],
            after=['consectetur CHANGED elit,',],
        )
    ]


def test_removed():
    assert changes(BEFORE, REMOVED) == [
        Deleted(before=['consectetur adipiscing elit,'])
    ]


def test_inserted():
    assert changes(BEFORE, INSERTED) == [
        Inserted(after=['This line INSERTED'])
    ]
