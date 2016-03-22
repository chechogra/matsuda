##Livereload setup (custom theme)
1. Open wp-content/themes/{custom-theme}/functions.php
2. Make sure livereload js file is pointing to the right host and port:
```php
wp_register_script('livereload', 'http://matsuda.local:35729/livereload.js?snipver=1', null, false, true);
```
