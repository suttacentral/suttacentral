# DPD Implementation

From https://github.com/digitalpalidictionary/dpd-db/tree/feature/db-relations/tbw/output

See https://github.com/digitalpalidictionary/dpd-db/tree/feature/db-relations/tbw for explaination

## Using JSON?

As there is an error loading JSON ? I created the js file instead by hand.

## lookupWord(word) description

    BEHAVIOUR
    take the word variable and search for that in dpd_i2h.json
    	if it return a list of headwords
    		look up each headword in the list in dpd_ebts.json
    			add the result to html_string
    lookup the word in  dpd_deconstructor.json
    	if it returns any results
    		 add the result to html_string
    display the html string as a popup
    TODO: the words in the popup must be able to be recursively looked up by clicking on them in the same way as above.

## Prompt used in phind.com for creating _dpdTransform() in sc-lookup-pli.js

Let say I have an array like this :

```
    [
      "akaci 1",
      "akaci 2",
      "akaci 3",
      "akaci 4",
      "akiñcita",
      "akiñcito 1",
      "akiñcito 2",
      "akiñcito 3",
      "akiña",
    ],
```

I want to transform it into an array like this

```
[
  {root: akaci, vars: [
      "akaci 1",
      "akaci 2",
      "akaci 3",
      "akaci 4"]},
{root: "akiñcita", vars: ["akiñcita"]},
{root: "akiñcito", vars: [
      "akiñcito 1",
      "akiñcito 2",
      "akiñcito 3"]},
 {root: "akiña", vars: [akiña]}
]
```

What would be the general function that could accomplish that transformatino for any array.

