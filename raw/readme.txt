The csv files in this directory are csv files used for creation of the json file. All links have been checked using the new numbering.
This is a dump of the parallels on SC, adjusted for the new numbering system that is in branch "scid".

The UID list are full parallels of each other, unless they are preceded by a "~", which means they are partial parallels of the main UIDs.
So "uids": ["A", "B", "~C"] means that A and B are full parallels and C is a partial of both.
For C there is another entry that looks like ["C", "~B", "~A"]
So this way, all three A B and C are listed as they should appear as a parallel list on the site.
This means that all inferred parallels are already incorporated.
There are a few cases where a "full" entry appears twice. The reason is that it could not be inferred. Then it just needs to be added to the other entry on the site.
So if we have ["A", "B", "~C"] and ["C", "~B", "~A"] but there is also ["B", "~D"], this has to appear on the site as:
for 
A: B,~C 
B: A,~C,~D
C: ~A,~B

Entries preceded by a "?" are parallels to a text we do not have in SC and these are usually explained in the REMARKS.

mention: the first entry is being mentioned in the second, third, etc text.
So for instance, "mention": ["dhp#183", "ne10#11", "pe12#10"], means that dhp183 is mentioned in Netti 10#11 AND in pe12#10
Same with "retold", where the first entry is being retold in the second.

Notation of ranges:
"an1.1-5" means all suttas from an1.1 to an1.5
"sf180#3.11" means uid sf180 at id 3.11
"sf196#13.21-#13.22" means uid sf196 with id 13.21 up to 13.22

In some rare cases, a "+" sign is used in the uid. For instance in "an10.217+219".
This means that the parallel is to a combination of 2 non-adjacent suttas.

For new numbering, see:
https://discourse.suttacentral.net/t/adding-sc-verse-numbers/2694/5 for the difference in numbering

There will no doubt be many errors and inconsistencies in the parallels themselves but I hope that over time this will slowly sort itself out.
