<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */
 
// Include local configuration
if (file_exists(dirname(__FILE__) . '/local-config.php')) {
	include(dirname(__FILE__) . '/local-config.php');
}

// Global DB config
if (!defined('DB_NAME')) {
	define('DB_NAME', 'matsuda');
}
if (!defined('DB_USER')) {
	define('DB_USER', 'root');
}
if (!defined('DB_PASSWORD')) {
	define('DB_PASSWORD', 'root');
}
if (!defined('DB_HOST')) {
	define('DB_HOST', 'localhost');
}

/** Database Charset to use in creating database tables. */
if (!defined('DB_CHARSET')) {
	define('DB_CHARSET', 'utf8');
}

/** The Database Collate type. Don't change this if in doubt. */
if (!defined('DB_COLLATE')) {
	define('DB_COLLATE', '');
}

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'XA(cG0T;^2Wxcy-1(s] =v (fv8Hs`^NqEO6EO 7+qb?-1AzK1l{o[:ebKLt-;_h');
define('SECURE_AUTH_KEY',  '?$5s,-y}P|1;[`x+{mf8DG{&KrinFp0/1y^4JBm*N&$NTwmA9dhY=M-u]uEg}C4n');
define('LOGGED_IN_KEY',    ':KpYg(Dfyw-yCW&(.2W]4l:AG2QDP-G62|+U0-{,esx06xbNxW[2k~.Q-:NC<a5j');
define('NONCE_KEY',        'MPa_?9Q?WU(ky>dBmM;w[pV-EKc$|1W }dK+]{eYDIpP#Y##!:4MGUxQ<w&nbAHr');
define('AUTH_SALT',        'K_Eg}Gn+Qd]uOFy75ZC=CSn,=~AmEf~1<J|-| -@W=k*;R!F^3kg Aw=JoUdu5FY');
define('SECURE_AUTH_SALT', '=)V8:}-h}%[n1lrsKvX0UpxfP;T&3+^XNY7L 2c:+Mz`1GUp=X|2$!ccJhWWDW1S');
define('LOGGED_IN_SALT',   'QIiH2hG;v;m_%/;v}C1Y*HS|z7EI<WlTS|_ :.75~AIW300009}Er9/PW<d-1)C]');
define('NONCE_SALT',       '0m|`?,lf1+nuFh|W+>RPi(PqI#dj<8;.ZJIu()hNwRY_U(U15n(9a-bDyO-o?sVw');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
if (!defined('WP_DEBUG')) {
	define('WP_DEBUG', false);
}

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
