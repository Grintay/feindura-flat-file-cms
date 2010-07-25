<?php

$adminConfig['url'] =              'localhost';
$adminConfig['basePath'] =         '/_feindura10/';
$adminConfig['savePath'] =         '/_feindura10/_pages/';
$adminConfig['uploadPath'] =       '/_feindura10/_upload/';
$adminConfig['websitefilesPath'] = '';
$adminConfig['stylesheetPath'] =   '';
$adminConfig['dateFormat'] =       'eu';
$adminConfig['speakingUrl'] =      false;

$adminConfig['varName']['page'] =     'page';
$adminConfig['varName']['category'] = 'category';
$adminConfig['varName']['modul'] =    'modul';

$adminConfig['user']['fileManager'] =      true;
$adminConfig['user']['editWebsiteFiles'] = true;
$adminConfig['user']['editStylesheets'] =  true;
$adminConfig['user']['info'] =             '';

$adminConfig['setStartPage'] =            true;
$adminConfig['page']['createdelete'] =    true;
$adminConfig['page']['thumbnails'] =      false;
$adminConfig['page']['plugins'] =         false;
$adminConfig['page']['showtags'] =        false;

$adminConfig['editor']['enterMode'] =  'p';
$adminConfig['editor']['styleFile'] =  '/_feindura10/style/layout.css';
$adminConfig['editor']['styleId'] =    '';
$adminConfig['editor']['styleClass'] = '';

$adminConfig['pageThumbnail']['width'] =  '100';
$adminConfig['pageThumbnail']['height'] = '150';
$adminConfig['pageThumbnail']['ratio'] =  'x';
$adminConfig['pageThumbnail']['path'] =   'images/thumbnails/';

return $adminConfig;
?>