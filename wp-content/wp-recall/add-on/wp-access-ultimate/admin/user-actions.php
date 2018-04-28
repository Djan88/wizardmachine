<?php

add_action('profile_personal_options', 'wau_admin_user_accounts');
add_action('edit_user_profile', 'wau_admin_user_accounts');
function wau_admin_user_accounts($user){
    
    $Settings = new WAU_User_Accounts_Settings(array(
        'user_id' => $user->ID
    ));

    if(!$Settings->accounts) return false;

    $content = '<h3>Доступы пользователя</h3>';

    $content .= '<div class="wau-user-access">';
    
    $content .= $Settings->get_settings_html();

    $content .= '</div>';
    
    echo $content;

}

add_action('personal_options_update', 'wau_save_user_access', 10);
add_action('edit_user_profile_update', 'wau_save_user_access', 10);
function wau_save_user_access($user_id){
    global $user_ID;

    if( !user_can($user_ID, 'administrator') || !isset($_POST['wau-userdata'])) return false;
    
    $Access = new WAU_Access();
    
    $userAccess = $Access->get_col(array(
        'user_id' => $user_id,
        'number' => -1,
        'fields' => array(
            'account_id'
        )
    ));

    $data = $_POST['wau-userdata'];

    $updAccounts = array();
    foreach($data as $account_id => $accessData){
        
        if(!isset($accessData['account_id'])) continue;
        
        $result = wau_update_user_access($user_id, $account_id, wau_setup_time(array(
            'year'      => $accessData['year'],
            'month'     => $accessData['month'],
            'day'       => $accessData['day'],
            'hour'      => $accessData['hour'],
            'minute'    => $accessData['minute'],
        )));
        
        $updAccounts[] = $account_id;
        
    }
    
    if($userAccess){
        
        foreach($userAccess as $account_id){
            if(!in_array($account_id, $updAccounts)){
                wau_delete_user_access_by_account($user_id, $account_id);
            }
        }
        
    }
    
}

