<?php
/**
 * Основные параметры WordPress.
 *
 * Этот файл содержит следующие параметры: настройки MySQL, префикс таблиц,
 * секретные ключи, язык WordPress и ABSPATH. Дополнительную информацию можно найти
 * на странице {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Кодекса. Настройки MySQL можно узнать у хостинг-провайдера.
 *
 * Этот файл используется сценарием создания wp-config.php в процессе установки.
 * Необязательно использовать веб-интерфейс, можно скопировать этот файл
 * с именем "wp-config.php" и заполнить значения.
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'machinem_db');

/** Имя пользователя MySQL */
define('DB_USER', 'machinem_user');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', 'APJ85XFI%ua!');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется снова авторизоваться.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '.q#5/WwQ!o WvpW$Ii+E]{`83CPB@I|>P|c|cI7(I {)Ao+{bQH<`nZULNo<&6k2');
define('SECURE_AUTH_KEY',  '.#cYUgS},In.^iLZ84! ){=q9prQmq?;5t[V~|K5`X`WI%VR;R-aa)eM%grNTLw<');
define('LOGGED_IN_KEY',    '[&*!C6|.&2G|zfX/ I>!!b[N;wu$XwFzUQg`p?!@^,wB6I+F8_dW3yf,COS3dT^f');
define('NONCE_KEY',        '8LYuVyE-+` >U2E`F|MhjuPI2doRz.~q_2FwhKTb+$?mzF7T^p8<39h$X9k5-/J8');
define('AUTH_SALT',        'EHGd8x1V.iQ`TZKYnH-U(8>Z`#qHQSB70c3S%-&l.+[$hcDn#A29).Bv=R?XR$P^');
define('SECURE_AUTH_SALT', 'o,m+/3n>UIGywC|vI]w-$=rtW:G@46. 1X*%/|ZC,Z>X(LEQho#%=k2VGOVJPt2]');
define('LOGGED_IN_SALT',   ';TPGIJ(U`xH iWQ:+|_Y_jI<hbtJ!)/>|.6.=i/MTO2u*|H!ee4}-8FG!kxB9D]E');
define('NONCE_SALT',       'Nl`qzup|kM.!Ss8jG:^Wv`p7=b|c4p7)VO;+r*N|FgSqmOq+{X:}O)5._N3Y7Bim');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько блогов в одну базу данных, если вы будете использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'wp_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Настоятельно рекомендуется, чтобы разработчики плагинов и тем использовали WP_DEBUG
 * в своём рабочем окружении.
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
