=== Basic User Avatars ===
Contributors: jaredatch
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AD8KTWTTDX9JL
Tags: avatar, gravatar, bbpress bbpress
Requires at least: 3.6
Tested up to: 3.6
Stable tag: 1.0.0
 
Adds an avatar upload field to user profiles. Front-end support. bbPress support.

== Description ==

Adds an avatar upload field to user profiles inside the WordPress dashboard.

Provides a plugin for front-end avatar management for sites that what to keep users out of the dashboard. Shortcode is `[basic-user-avatars]`.

Automatically adds avatar support to bbPress (2.3+) user profiles if bbPress is activated.

Consider this plugin **beta**, support is limited.

**Note:** This plugin is a fork of Simple Local Avatars v1.3.1 by Jake Goldman (10up). If you want snazzy ajax and some other nifty features, check out [Simple Local Avatars 2.0](http://wordpress.org/plugins/simple-local-avatars).

== Installation ==

1. Upload `bbpress-genesis-extend` to your `/wp-content/plugins/` directory or download through the Plugins page
1. Activate the plugin through the 'Plugins' menu in WordPress
1. If you only want users with file upload capabilities to upload avatars, check the applicable option under Settings > Discussion
1. Start uploading avatars by editing user profiles!

bbPress support is added automatically if bbPress is activated.

Shortcode for front-end support is `[basic-user-avatars]`.

== Frequently Asked Questions ==

= I'm still having problems =

Why this plugin has been tested with common server setups, some enviroments could cause an issue.

If you are having a problem deactivate all plugins other than this one and then switch you theme to TwentyTweleve. If things then
work, then the issue is with a 3rd party theme or plugin.

== Screenshots ==

1. Option on the user profile edit page. 
1. Option on the front-end via the shortcode.
1. Option on the bbPress user profile edit page. 

== Changelog ==

= 1.0.0 =
* Initial launch, should be considered beta. Use with caution.