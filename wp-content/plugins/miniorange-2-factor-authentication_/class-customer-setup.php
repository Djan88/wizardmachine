<?php/** miniOrange enables user to log in through mobile authentication as an additional layer of security over password.    Copyright (C) 2015  miniOrange    This program is free software: you can redistribute it and/or modify    it under the terms of the GNU General Public License as published by    the Free Software Foundation, either version 3 of the License, or    (at your option) any later version.    This program is distributed in the hope that it will be useful,    but WITHOUT ANY WARRANTY; without even the implied warranty of    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the    GNU General Public License for more details.    You should have received a copy of the GNU General Public License    along with this program.  If not, see <http://www.gnu.org/licenses/>* @package 		miniOrange OAuth* @license		http://www.gnu.org/copyleft/gpl.html GNU/GPL, see LICENSE.php*//**This library is miniOrange Authentication Service. Contains Request Calls to Customer service.**/class Customer_Setup{		public $email;	public $phone;	public $customerKey;	public $transactionId;		function check_customer() {		if(!MO2f_Utility::is_curl_installed()) {			$message =   __( 'Please enable curl extension.', 'miniorange-2-factor-authentication'). 						' <a href="admin.php?page=miniOrange_2_factor_settings&amp;mo2f_tab=mo2f_help">'.						__('Click here', 'miniorange-2-factor-authentication').   						' </a>'.						__( 'for the steps to enable curl or check Help & Troubleshooting.', 'miniorange-2-factor-authentication');			return json_encode(array("status"=>'ERROR',"message"=>$message));		}				$url 	= get_site_option('mo2f_host_name') . "/moas/rest/customer/check-if-exists";		$ch 	= curl_init( $url );		$email 	= get_site_option("mo2f_email");		$fields = array(			'email' 	=> $email,		);		$field_string = json_encode( $fields );		curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, false );		curl_setopt( $ch, CURLOPT_ENCODING, "" );		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );		curl_setopt( $ch, CURLOPT_AUTOREFERER, true );		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );    # required for https urls		curl_setopt( $ch, CURLOPT_MAXREDIRS, 10 );		curl_setopt( $ch, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json', 'charset: UTF - 8', 'Authorization: Basic' ) );		curl_setopt( $ch, CURLOPT_POST, true);		curl_setopt( $ch, CURLOPT_POSTFIELDS, $field_string);		curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 5);        curl_setopt( $ch, CURLOPT_TIMEOUT, 20);			$proxy_host = get_option( 'mo2f_proxy_host' );		if (! empty(  $proxy_host ) ){			curl_setopt( $ch, CURLOPT_PROXY, get_option( 'mo2f_proxy_host' ) );			curl_setopt( $ch, CURLOPT_PROXYPORT, get_option( 'mo2f_port_number' ) );			curl_setopt( $ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC );			curl_setopt( $ch, CURLOPT_PROXYUSERPWD, get_option( "mo2f_proxy_username" ) . ':' . get_option( "mo2f_proxy_password" ) );		}		$content = curl_exec( $ch );		if( curl_errno( $ch ) ){			return null;		}		curl_close( $ch );		return $content;	}		function create_customer(){		if(!MO2f_Utility::is_curl_installed()) {			$message =   __( 'Please enable curl extension.', 'miniorange-2-factor-authentication'). 						' <a href="admin.php?page=miniOrange_2_factor_settings&amp;mo2f_tab=mo2f_help">'.						__( 'Click here', 'miniorange-2-factor-authentication').   						' </a>'.						__( 'for the steps to enable curl or check Help & Troubleshooting.', 'miniorange-2-factor-authentication');			return json_encode(array("status"=>'ERROR',"message"=>$message));		}				$url = get_site_option('mo2f_host_name') . '/moas/rest/customer/add';		$ch = curl_init($url);		global $current_user;		$current_user = wp_get_current_user();		$this->email = get_site_option('mo2f_email');		global $dbQueries;		$this->phone = $dbQueries->get_user_detail('mo2f_user_phone' ,$current_user->ID);		$password = get_site_option('mo2f_password');				$fields = array(			'companyName' => $_SERVER['SERVER_NAME'],			'areaOfInterest' => 'WordPress 2 Factor Authentication Plugin',			'productInterest' => 'API_2FA',			'firstname' => $current_user->user_firstname,			'lastname' => $current_user->user_lastname,			'email' => $this->email,			'phone' => $this->phone,			'password' => $password		);		$field_string = json_encode($fields);				curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, false );		curl_setopt( $ch, CURLOPT_ENCODING, "" );		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );		curl_setopt( $ch, CURLOPT_AUTOREFERER, true );		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );    # required for https urls				curl_setopt( $ch, CURLOPT_MAXREDIRS, 10 );		curl_setopt($ch, CURLOPT_HTTPHEADER, array(			'Content-Type: application/json',			'charset: UTF - 8',			'Authorization: Basic'			));		curl_setopt( $ch, CURLOPT_POST, true);		curl_setopt( $ch, CURLOPT_POSTFIELDS, $field_string);		curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 5);        curl_setopt( $ch, CURLOPT_TIMEOUT, 20);			$proxy_host = get_option( 'mo2f_proxy_host' );		if (! empty(  $proxy_host ) ){			curl_setopt( $ch, CURLOPT_PROXY, get_option( 'mo2f_proxy_host' ) );			curl_setopt( $ch, CURLOPT_PROXYPORT, get_option( 'mo2f_port_number' ) );			curl_setopt( $ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC );			curl_setopt( $ch, CURLOPT_PROXYUSERPWD, get_option( "mo2f_proxy_username" ) . ':' . get_option( "mo2f_proxy_password" ) );		}		$content = curl_exec($ch);				if(curl_errno($ch)){			return null;		}				curl_close($ch);		return $content;	}		function get_customer_key() {		if(!MO2f_Utility::is_curl_installed()) {			$message =   __( 'Please enable curl extension.', 'miniorange-2-factor-authentication'). 						' <a href="admin.php?page=miniOrange_2_factor_settings&amp;mo2f_tab=mo2f_help">'.						__( 'Click here', 'miniorange-2-factor-authentication').   						' </a>'.						__( 'for the steps to enable curl or check Help & Troubleshooting.', 'miniorange-2-factor-authentication');			return json_encode(array("status"=>'ERROR',"message"=>$message));		}				$url = get_site_option('mo2f_host_name') . "/moas/rest/customer/key";		$ch = curl_init($url);		$email = get_site_option("mo2f_email");		$password = get_site_option("mo2f_password");				$fields = array(			'email' => $email,			'password' => $password		);		$field_string = json_encode($fields);				curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, false );		curl_setopt( $ch, CURLOPT_ENCODING, "" );		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );		curl_setopt( $ch, CURLOPT_AUTOREFERER, true );		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );    # required for https urls				curl_setopt( $ch, CURLOPT_MAXREDIRS, 10 );		curl_setopt($ch, CURLOPT_HTTPHEADER, array(			'Content-Type: application/json',			'charset: UTF - 8',			'Authorization: Basic'			));		curl_setopt( $ch, CURLOPT_POST, true);		curl_setopt( $ch, CURLOPT_POSTFIELDS, $field_string);		curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 5);        curl_setopt( $ch, CURLOPT_TIMEOUT, 20);			$proxy_host = get_option( 'mo2f_proxy_host' );		if (! empty(  $proxy_host ) ){			curl_setopt( $ch, CURLOPT_PROXY, get_option( 'mo2f_proxy_host' ) );			curl_setopt( $ch, CURLOPT_PROXYPORT, get_option( 'mo2f_port_number' ) );			curl_setopt( $ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC );			curl_setopt( $ch, CURLOPT_PROXYUSERPWD, get_option( "mo2f_proxy_username" ) . ':' . get_option( "mo2f_proxy_password" ) );		}		$content = curl_exec($ch);		if(curl_errno($ch)){			return null;		}		curl_close($ch);		return $content;	}		function send_otp_token($uKey,$authType,$cKey,$apiKey){		if(!MO2f_Utility::is_curl_installed()) {			$message =   __( 'Please enable curl extension.', 'miniorange-2-factor-authentication'). 						' <a href="admin.php?page=miniOrange_2_factor_settings&amp;mo2f_tab=mo2f_help">'.						__( 'Click here', 'miniorange-2-factor-authentication').   						' </a>'.						__( 'for the steps to enable curl or check Help & Troubleshooting.', 'miniorange-2-factor-authentication');			return json_encode(array("status"=>'ERROR',"message"=>$message));		}        		if (is_array($uKey)){			$email = $uKey["email"];			$phone = $uKey["phone"];		}						$url = get_site_option('mo2f_host_name') . '/moas/api/auth/challenge';		$ch = curl_init($url);				/* The customer Key provided to you */		$customerKey = $cKey;			/* The customer API Key provided to you */		$apiKey = $apiKey;			/* Current time in milliseconds since midnight, January 1, 1970 UTC. */		$currentTimeInMillis = round(microtime(true) * 1000);			/* Creating the Hash using SHA-512 algorithm */		$stringToHash = $customerKey . number_format($currentTimeInMillis, 0, '', '') . $apiKey;		$hashValue = hash("sha512", $stringToHash);			$customerKeyHeader = "Customer-Key: " . $customerKey;		$timestampHeader = "Timestamp: " . number_format($currentTimeInMillis, 0, '', '');		$authorizationHeader = "Authorization: " . $hashValue;			$ipAddress = MO2f_Utility::get_client_ipaddress();				$fields = '';		if( $authType == 'EMAIL' ) {			$fields = array(				'customerKey' => $customerKey,				'email' => $uKey,				'authType' => $authType,				'ipAddress' => $ipAddress,				'transactionName' => 'WordPress 2 Factor Authentication Plugin'			);		}else if($authType == 'OTP_OVER_SMS' || $authType == 'PHONE_VERIFICATION'){			if($authType == 'OTP_OVER_SMS'){				$authType ="SMS";			}else if($authType == 'PHONE_VERIFICATION'){				$authType ="PHONE VERIFICATION";			}						$fields = array(				'customerKey' => $customerKey,				'phone' => $uKey,				'authType' => $authType,				'transactionName' => 'WordPress 2 Factor Authentication Plugin'			);		}else if($authType == 'OTP_OVER_SMS_AND_EMAIL') {			$fields = array(				'customerKey' => $customerKey,				'phone' => $phone,				'email' => $email,				'authType' => "SMS AND EMAIL",				'transactionName' => 'WordPress 2 Factor Authentication Plugin'			);		}else if($authType == 'OTP_OVER_EMAIL') {			$fields = array(				'customerKey' => $customerKey,				'email' => $uKey,				'authType' => "EMAIL",				'transactionName' => 'WordPress 2 Factor Authentication Plugin'			);		}else{						$fields = array(				'customerKey' => $customerKey,				'username' => $uKey,				'authType' => $authType,				'ipAddress' => $ipAddress,				'transactionName' => 'WordPress 2 Factor Authentication Plugin'			);		}				$field_string = json_encode($fields);				curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, false );		curl_setopt( $ch, CURLOPT_ENCODING, "" );		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );		curl_setopt( $ch, CURLOPT_AUTOREFERER, true );		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );    # required for https urls				curl_setopt( $ch, CURLOPT_MAXREDIRS, 10 );		curl_setopt( $ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json", $customerKeyHeader, $timestampHeader, $authorizationHeader));		curl_setopt( $ch, CURLOPT_POST, true);		curl_setopt( $ch, CURLOPT_POSTFIELDS, $field_string);		curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 5);        curl_setopt( $ch, CURLOPT_TIMEOUT, 20);			$proxy_host = get_option( 'mo2f_proxy_host' );		if (! empty(  $proxy_host ) ){			curl_setopt( $ch, CURLOPT_PROXY, get_option( 'mo2f_proxy_host' ) );			curl_setopt( $ch, CURLOPT_PROXYPORT, get_option( 'mo2f_port_number' ) );			curl_setopt( $ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC );			curl_setopt( $ch, CURLOPT_PROXYUSERPWD, get_option( "mo2f_proxy_username" ) . ':' . get_option( "mo2f_proxy_password" ) );		}		$content = curl_exec($ch);				if(curl_errno($ch)){		   return null;		}		curl_close($ch);		return $content;	}		function validate_otp_token($authType,$username,$transactionId,$otpToken,$cKey,$customerApiKey){		if(!MO2f_Utility::is_curl_installed()) {			$message =   __( 'Please enable curl extension.', 'miniorange-2-factor-authentication'). 						' <a href="admin.php?page=miniOrange_2_factor_settings&amp;mo2f_tab=mo2f_help">'.						__( 'Click here', 'miniorange-2-factor-authentication').   						' </a>'.						__( 'for the steps to enable curl or check Help & Troubleshooting.', 'miniorange-2-factor-authentication');			return json_encode(array("status"=>'ERROR',"message"=>$message));		}				$url = get_site_option('mo2f_host_name') . '/moas/api/auth/validate';		$ch = curl_init($url);				/* The customer Key provided to you */		$customerKey = $cKey;			/* The customer API Key provided to you */		$apiKey = $customerApiKey;			/* Current time in milliseconds since midnight, January 1, 1970 UTC. */		$currentTimeInMillis = round(microtime(true) * 1000);			/* Creating the Hash using SHA-512 algorithm */		$stringToHash = $customerKey . number_format($currentTimeInMillis, 0, '', '') . $apiKey;		$hashValue = hash("sha512", $stringToHash);			$customerKeyHeader = "Customer-Key: " . $customerKey;		$timestampHeader = "Timestamp: " . number_format($currentTimeInMillis, 0, '', '');		$authorizationHeader = "Authorization: " . $hashValue;				$fields = '';		if( $authType == 'SOFT TOKEN' || $authType == 'GOOGLE AUTHENTICATOR') {			/*check for soft token*/			$fields = array(				'customerKey' => $customerKey,				'username' => $username,				'token' => $otpToken,				'authType' => $authType			);		}else if($authType == 'KBA'){			$fields = array(				'txId' => $transactionId,				 'answers' => array(					array(						'question' => $otpToken[0],						'answer' => $otpToken[1]					),					array(						'question' => $otpToken[2],						'answer' => $otpToken[3]					)				)				);		}else{			//*check for otp over sms/email			$fields = array(				'txId' => $transactionId,				'token' => $otpToken			);		}		$field_string = json_encode($fields);				curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, false );		curl_setopt( $ch, CURLOPT_ENCODING, "" );		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );		curl_setopt( $ch, CURLOPT_AUTOREFERER, true );		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );    # required for https urls				curl_setopt( $ch, CURLOPT_MAXREDIRS, 10 );		curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json", $customerKeyHeader, 											$timestampHeader, $authorizationHeader));		curl_setopt( $ch, CURLOPT_POST, true);		curl_setopt( $ch, CURLOPT_POSTFIELDS, $field_string);		curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 5);        curl_setopt( $ch, CURLOPT_TIMEOUT, 20);			$proxy_host = get_option( 'mo2f_proxy_host' );		if (! empty(  $proxy_host ) ){			curl_setopt( $ch, CURLOPT_PROXY, get_option( 'mo2f_proxy_host' ) );			curl_setopt( $ch, CURLOPT_PROXYPORT, get_option( 'mo2f_port_number' ) );			curl_setopt( $ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC );			curl_setopt( $ch, CURLOPT_PROXYUSERPWD, get_option( "mo2f_proxy_username" ) . ':' . get_option( "mo2f_proxy_password" ) );		}		$content = curl_exec($ch);				if(curl_errno($ch)){			return null;		}		curl_close($ch);		return $content;	}	function send_email_alert($email,$content){				$hostname 	= get_site_option('mo2f_host_name') ;		$url = $hostname . '/moas/api/notify/send';		$ch = curl_init($url);		$customerKey = get_site_option('mo2f_customerKey');		$apiKey =  get_site_option('mo2f_api_key');		$currentTimeInMillis= round(microtime(true) * 1000);		$stringToHash 		= $customerKey .  number_format($currentTimeInMillis, 0, '', '') . $apiKey;		$hashValue 			= hash("sha512", $stringToHash);		$customerKeyHeader 	= "Customer-Key: " . $customerKey;		$timestampHeader 	= "Timestamp: " .  number_format($currentTimeInMillis, 0, '', '');		$authorizationHeader= "Authorization: " . $hashValue;		$toEmail 			= $email;		$subject            = get_site_option('mo2f_users_notify_subject');		$site_url=site_url();						$content='<table cellpadding="25" style="margin:0px auto"><tbody><tr><td><table cellpadding="24" width="584px" style="margin:0 auto;max-width:584px;background-color:#f6f4f4;border:1px solid #a8adad">						<tbody><tr><td><img src="'.get_site_option('mo2f_users_notify_image').'" style="color:#5fb336;text-decoration:none;display:block;width:auto;height:auto;max-height:35px" ></td>						</tr></tbody></table><table cellpadding="24" style="background:#fff;border:1px solid #a8adad;width:584px;border-top:none;color:#4d4b48;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px">						<tbody><tr><td>						<p style="margin-top:0;margin-bottom:20px">Dear User,</p><p style="margin-top:0;margin-bottom:10px"><p style="margin-top:0;margin-bottom:10px">'.get_site_option('mo2f_users_notify_msg1').'</p></p>						<p style="margin-top:0;margin-bottom:10px"><p style="margin-top:0;margin-bottom:10px">'. get_site_option('mo2f_users_notify_msg2').' <a href="'.get_site_option('mo2f_users_notify_site_url').'" target="_blank">'.get_site_option('mo2f_users_notify_site_url').'</a>						<p style="margin-top:0;margin-bottom:15px">Thank you,<br>'. get_site_option('mo2f_users_notify_msg3').'</p><p style="margin-top:0;margin-bottom:0px;font-size:11px">Disclaimer: This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed.</p>						</span></td></tr></tbody></table></td></tr></tbody></table>';						$fromEmail  = get_site_option('mo2f_email');					$fields = array(			'customerKey'	=> $customerKey,			'sendEmail' 	=> true,			'email' 		=> array(				'customerKey' 	=> $customerKey,				'fromEmail' 	=> $fromEmail,				'bccEmail' 		=> $fromEmail,				'fromName' 		=> 'miniOrange',				'toEmail' 		=> $toEmail,				'toName' 		=> $toEmail,				'subject' 		=> $subject,				'content' 		=> $content			),		);		$field_string = json_encode($fields);				curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );		curl_setopt( $ch, CURLOPT_ENCODING, "" );		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );		curl_setopt( $ch, CURLOPT_AUTOREFERER, true );		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );    # required for https urls		curl_setopt( $ch, CURLOPT_MAXREDIRS, 10 );		curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json", $customerKeyHeader,			$timestampHeader, $authorizationHeader));		curl_setopt( $ch, CURLOPT_POST, true);		curl_setopt( $ch, CURLOPT_POSTFIELDS, $field_string);		$content = curl_exec($ch);		if(curl_errno($ch)){			return json_encode(array("status"=>'ERROR','statusMessage'=>curl_error($ch)));		}		curl_close($ch);		return $content;	}	function submit_contact_us( $q_email, $q_phone, $query ) {		if(!MO2f_Utility::is_curl_installed()) {			$message =   __( 'Please enable curl extension.', 'miniorange-2-factor-authentication'). 						' <a href="admin.php?page=miniOrange_2_factor_settings&amp;mo2f_tab=mo2f_help">'.						__( 'Click here', 'miniorange-2-factor-authentication').   						' </a>'.						__( 'for the steps to enable curl or check Help & Troubleshooting.', 'miniorange-2-factor-authentication');			return json_encode(array("status"=>'ERROR',"message"=>$message));		}				$url = get_site_option('mo2f_host_name') . "/moas/rest/customer/contact-us";		$ch = curl_init($url);		global $current_user;		$current_user = wp_get_current_user();		$query = '[WordPress 2 Factor Authentication Plugin]: ' . $query;		$fields = array(			'firstName'			=> $current_user->user_firstname,			'lastName'	 		=> $current_user->user_lastname,			'company' 			=> $_SERVER['SERVER_NAME'],			'email' 			=> $q_email,			'phone'				=> $q_phone,			'query'				=> $query		);		$field_string = json_encode( $fields );				curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, false );		curl_setopt( $ch, CURLOPT_ENCODING, "" );		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );		curl_setopt( $ch, CURLOPT_AUTOREFERER, true );		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );    # required for https urls				curl_setopt( $ch, CURLOPT_MAXREDIRS, 10 );		curl_setopt( $ch, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json', 'charset: UTF-8', 'Authorization: Basic' ) );		curl_setopt( $ch, CURLOPT_POST, true);		curl_setopt( $ch, CURLOPT_POSTFIELDS, $field_string);		curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 5);        curl_setopt( $ch, CURLOPT_TIMEOUT, 20);			$proxy_host = get_option( 'mo2f_proxy_host' );		if (! empty(  $proxy_host ) ){			curl_setopt( $ch, CURLOPT_PROXY, get_option( 'mo2f_proxy_host' ) );			curl_setopt( $ch, CURLOPT_PROXYPORT, get_option( 'mo2f_port_number' ) );			curl_setopt( $ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC );			curl_setopt( $ch, CURLOPT_PROXYUSERPWD, get_option( "mo2f_proxy_username" ) . ':' . get_option( "mo2f_proxy_password" ) );		}		$content = curl_exec( $ch );				if(curl_errno($ch)){			return null;		}		curl_close($ch);		return true;	}		function forgot_password($email){		if(!MO2f_Utility::is_curl_installed()) {			$message =   __( 'Please enable curl extension.', 'miniorange-2-factor-authentication'). 						' <a href="admin.php?page=miniOrange_2_factor_settings&amp;mo2f_tab=mo2f_help">'.						__( 'Click here', 'miniorange-2-factor-authentication').   						' </a>'.						__( 'for the steps to enable curl or check Help & Troubleshooting.', 'miniorange-2-factor-authentication');			return json_encode(array("status"=>'ERROR',"message"=>$message));		}				$url = get_site_option('mo2f_host_name') . '/moas/rest/customer/password-reset';		$ch = curl_init($url);			$fields = array(			'email' => $email		);				$field_string = json_encode($fields);				curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, false );		curl_setopt( $ch, CURLOPT_ENCODING, "" );		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );		curl_setopt( $ch, CURLOPT_AUTOREFERER, true );		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );    # required for https urls				curl_setopt( $ch, CURLOPT_MAXREDIRS, 10 );		curl_setopt( $ch, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json', 'charset: UTF - 8', 'Authorization: Basic' ) );		curl_setopt( $ch, CURLOPT_POST, true);		curl_setopt( $ch, CURLOPT_POSTFIELDS, $field_string);		curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 5);        curl_setopt( $ch, CURLOPT_TIMEOUT, 20);		$proxy_host = get_option( 'mo2f_proxy_host' );		if (! empty(  $proxy_host ) ){			curl_setopt( $ch, CURLOPT_PROXY, get_option( 'mo2f_proxy_host' ) );			curl_setopt( $ch, CURLOPT_PROXYPORT, get_option( 'mo2f_port_number' ) );			curl_setopt( $ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC );			curl_setopt( $ch, CURLOPT_PROXYUSERPWD, get_option( "mo2f_proxy_username" ) . ':' . get_option( "mo2f_proxy_password" ) );		}		$content = curl_exec($ch);				if(curl_errno($ch)){			return null;		}		curl_close($ch);		return $content;	}}?>