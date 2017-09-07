These JSON files are elasticsearch configuration files.

They use a simple inheritence scheme, anything under  the top-level
"index" field is sent to Elasticsearch. If the "inherits" field is
specificied then those files will be loaded first, and merged with
each other and any contents of the "index" field. Both "index"
and "inherits" are optional but normally it will make sense to have
one or both. "inherits" should be a list of names, and the names
should omit '.json'.

By convention files named *.auto.json are generated automatically
(see sc.search module) and should not be edited directly. The 
'.auto' needs to be included in the name in the inherits field.
It is guaranteed that these files will be created/updated before
other files attempt to inherit from them.
