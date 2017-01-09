<?php
function isEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}
if($_POST) {
    $mailchimp_api_key = '2be4072c0e2a87c6f23663c13a849654-us14';
    $mailchimp_list_id = '906a9cd1db';
    $subscriber_email = addslashes(trim($_POST['email']));
    if(!isEmail($subscriber_email)) {
        $array = array();
        $array['valid'] = 0;
        $array['message'] = '<div class="alert alert-danger"><strong>Error:</strong> You must use a valid email address (for example, "joe@mail.com").</div>';
        echo json_encode($array);
    }
    else {
        $array = array();
        $merge_vars = array();
        require_once 'MailChimp.php';
        $MailChimp = new \Drewm\MailChimp($mailchimp_api_key);
        $result = $MailChimp->call('lists/subscribe', array(
                'id'                => $mailchimp_list_id,
                'email'             => array('email' => $subscriber_email),
                'double_optin'      => false,
                'update_existing'   => true,
                'replace_interests' => false,
                'send_welcome'      => false,
        ));
        if($result == false) {
            $array['valid'] = 0;
            $array['message'] = '<div class="alert alert-danger"><strong>Error:</strong> An error has occurred! Please refresh the page and try again.</div>';
        }

        else {
            $array['valid'] = 1;
            $array['message'] = 'Thanks! We\'ll be sure to keep you in the loop.';
        }
            echo json_encode($array);
    }
}
