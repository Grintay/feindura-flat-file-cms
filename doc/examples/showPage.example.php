<?php
/*                               *** CODE *** 
--------------------------------------------------------------------------------
This example uses all possible properties.
It's also goes much more simple: just call createLink(1) without setting properties
and you have a simple link with the page title.
*/

require('cms/feindura.include.php');

// creates a new feindura instance
$myCms = new feinduraPages();

// set properties
$myCms->xHtml =                  true;

$myCms->showError =              true;
$myCms->errorTag =               'span';
$myCms->errorId =                'errorId';
$myCms->errorClass =             'errorClass';
$myCms->errorAttributes =        'test="exampleAttribute1" onclick="exampleAttribute2"';

$myCms->titleLength =            20;
$myCms->titleAsLink =            true;
$myCms->titleShowPageDate =      true;
$myCms->titleShowCategory =      false; // have no effect, because page with ID "1" is not in a category
$myCms->titleCategorySeperator = ' -> ';

$myCms->thumbnailAlign =         'left';
$myCms->thumbnailId =            'thumbId';
$myCms->thumbnailClass =         'thumbCLass';
$myCms->thumbnailAttributes =    'test="exampleAttribute1" onclick="exampleAttribute2"';
$myCms->thumbnailBefore =        false;
$myCms->thumbnailAfter =         false;


// finally return the page with ID "1" using the above set properties
$page = $myCms->showPage(1,100,true);

// displays the page
echo $page['title'];
echo $page['thumbnail'];
echo $page['content'];



/*                              *** RESULT with page *** 
--------------------------------------------------------------------------------
*/

<a href="?page=1" title="2010-12-31 Example Page">
2010-12-31 Example...
</a>

<p>Lorem ipsum dolor sit amet, consetetur sadipscing dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.</p>

<h2>Header 2</h2>
<p>Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ...
<a href="?page=1">mehr</a></p>


/*                              *** RESULT with error *** 
--------------------------------------------------------------------------------
*/

<span id="errorId" class="errorClass" test="exampleAttribute1" onclick="exampleAttribute2">The requested page is currently not available.</span>


?>