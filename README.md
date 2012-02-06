
b4t ( v2.0b )
a minimal Blog 4 minimal Thoughts
===================================
releasd under GPLv3 (see LICENSE)
coded by CirKu17 (CirKu17@gmail.com)


b4t is a lightweight blog cms developed in perl and based on xml, aimed to quickly manage blog posts using just a text editor and one or two shell commands.

b4t is designed to be used in the most flexible way possible :

- The html is intentionally "essential" to better fit your website, so you can place it where you want.
- The client-side is thought to be fast-usable
- XML is elegant and easy-readable and editable
- You can change the post template and differently structure the xml and the visualization


"Installing"
-------------

Just copy the server-side files to your website. (Refer to Files section)

The perl script uses the following modules:
- Regexp::Common
- Template
so be sure they are installed

Files
------

- Client-side:

* post.txt` or thenameyouwant : is the post text file you write and pass to the script.

* post.tt : is the Template Toolkit file ( if you don't know what it means visit http://template-toolkit.org/ or http://search.cpan.org/~abw/Template-Toolkit-2.22/lib/Template.pm )

* post.xml : is the single post xml

* post.pl : does the magic

* post_db.xml : is the xml database file containing your blog posts

- Server-side:

* thoughts.html : is the html

* thoughts.css : is the relative CSS ( by default must be located in /css )

b4t.js : extracts and writes out the posts from the xml db ( by default must be located in /js )

post_db.xml : Yes, actually this file is both client and server side. Just create two copies: one on your local pc and one in the same website directory of thoughts.html .
When you write a new post, update the online version of the file with the local version.


Obviously, you can also put everything on your server and work from there if you have ssh access and perl installed.

Write a post
-------------

Writing a post is really simple: just create a new text file and fill it like this :

```yaml
fill the first line with the timestamp of the blog post
fill the second line with your title
write the content in the rest of the file as you like.
Urls will be converted as clickable, and newlines are respected

( Refer to the sample_post.txt for an example )
```

After that, you have to launch the post.pl script passing the filename of your post file as an argument :
```bash
$ perl post.pl post.txt
```
The script parses your txt post file, passes it through a template, generates the single post' xml and adds it in the posts database.

Then you just have to update the post_db.xml file on your website. You can do that anyway you want, you need not to tell you how, right?


Modify/remove a post
---------------------

Just edit post_db.xml .
