<?php

class WAU_User extends WAU_Accounts_Walker{

    public $user_id;
    public $access;
    public $branch_accounts;

    function __construct($args) {

        parent::__construct(array(
            'number' => -1
        ));

        $this->init_properties($args);

        if(!$this->access){

            $query = new WAU_Access();

            $this->access = $query->get_results(array(
                'user_id' => $this->user_id,
                'number' => -1
            ));

        }

        if($this->access){

            $branch_accounts = array();
            foreach($this->access as $access){
                if(!$this->get_branch($access->account_id)) continue;
                $branch_accounts = array_merge($branch_accounts, $this->get_branch($access->account_id));
            }

            if($branch_accounts){

                foreach($branch_accounts as $account){
                    $this->branch_accounts[] = $account->account_id;
                }

                array_unique($this->branch_accounts);

            }

        }

    }

    function init_properties($args){

        $properties = get_class_vars(get_class($this));

        foreach ($properties as $name=>$val){
            if(isset($args[$name])) $this->$name = $args[$name];
        }

    }

    function get_account_ids(){

        if(!$this->access) return false;

        $accoint_ids = array();
        foreach($this->access as $access){
            $accoint_ids[] = $access->account_id;
        }

        return $accoint_ids;

    }

    function is_access($account_ids){

        if(!$this->access) return false;

        if(is_array($account_ids)){

            foreach($this->access as $access){
                if(!in_array($access->account_id, $account_ids)) continue;
                return true;
            }

        }else{

            foreach($this->access as $access){
                if($access->account_id != $account_ids) continue;
                return true;
            }

        }

        return false;

    }

    function is_branch_access($account_id, $important = false){

        if(!$this->branch_accounts) return false;

        if(is_array($account_id)){

            foreach($account_id as $accID){

                if($important){
                    if(in_array($accID, $this->branch_accounts)) $access[] = $accID;
                }else{
                    if(in_array($accID, $this->branch_accounts)) return true;
                }

            }

            if($important){
                return count($account_id) == count($access);
            }

        }else{

            return in_array($account_id, $this->branch_accounts);

        }

        return false;

    }

    function get_access_by_account($account_id){

        if(!$this->access) return false;

        foreach($this->access as $access){
            if($access->account_id != $account_id) continue;
            return $access;
        }

        return false;

    }

    function get_time_value($valueName, $account_id){

        $access = $this->get_access_by_account($account_id);

        if(!$access) return 0;

        $timeValues = wau_parse_time($access->access_time);

        return $timeValues[$valueName];

    }

    function get_current_time_value($valueName, $account_id){

        $access = $this->get_access_by_account($account_id);

        if(!$access) return 0;

        $time = $access->access_time - (strtotime(current_time('mysql')) - strtotime($access->access_date));

        $timeValues = wau_parse_time($time);

        return $timeValues[$valueName];

    }

    function get_hidden_posts(){
        global $wpdb;

        $dataClosedPosts = $wpdb->get_results("SELECT "
        . "post_id, meta_value "
        . "FROM $wpdb->postmeta "
        . "WHERE meta_key='wau-access'");

        if(!$dataClosedPosts) return false;

        $hidden_posts = array();

        foreach($dataClosedPosts as $data){

            $access_ids = array();

            $value = maybe_unserialize($data->meta_value);

            $hidden = isset($value->options['hidden'])? $value->options['hidden']: 0;

            if(!$hidden) continue;

            foreach($value->access as $accessData){
                $access_ids[] = $accessData->account_id;
            }

            if (!$this->is_branch_access($access_ids, $value->options['important'])) {
                $hidden_posts[] = $data->post_id;
            }

        }

        return $hidden_posts;

    }

    function get_hidden_terms(){
        global $wpdb;

        $dataClosedTerms = $wpdb->get_results("SELECT "
        . "tm.term_id, tm.meta_value, tt.taxonomy "
        . "FROM $wpdb->termmeta AS tm "
        . "INNER JOIN $wpdb->term_taxonomy AS tt ON tm.term_id=tt.term_id "
        . "WHERE tm.meta_key='wau-access'");

        if(!$dataClosedTerms) return false;

        $hidden_terms = array();

        foreach($dataClosedTerms as $data){

            $access_ids = array();

            $value = maybe_unserialize($data->meta_value);

            $hidden = isset($value->options['hidden'])? $value->options['hidden']: 0;

            if(!$hidden) continue;

            foreach($value->access as $accessData){
                $access_ids[] = $accessData->account_id;
            }

            if (!$this->is_branch_access($access_ids, $value->options['important'])) {
                $hidden_terms[$data->taxonomy][] = $data->term_id;
            }

        }

        return $hidden_terms;

    }

}

