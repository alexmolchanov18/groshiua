<?php
/**
 * @class: SalesDoublerApiLeads
 * @params: POST
 * @author: dvoloshyn@varteq.com
 * @date: 05.10.2018
 */
class MediaBuyingApi
{
    private $_post;

    const REMOTE_DOMAIN = "http://api.admin.salesdoubler.net";//'http://api.sd.test.dev.clients.in.ua';//
    const REMOTE_PATH   = "/mediabuying/statistics/groshiua_z2/";
    const ACCESS_TOKEN  = "mE7AJia6qTrXCEbF6Bo31uoF4wSkhHUZ";//'4841d27398e843b6a51bd2edf5b7d334';//

    public function __construct()
    {
        $this->_post = $_POST;
    }

    public function send()
    {
       /* $post = $this->_getPreparedRequest();

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->_getUrl());
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $headers = $this->_getHeaders();

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $output = curl_exec($ch);
        file_put_contents('res.json', $output);
        curl_close($ch);
*/
        return true;
    }

    public function get($key)
    {
        if (!array_key_exists($key, $this->_post)) {
            return 'not fount';
        }

        return $this->_post[$key];
    }

    private function _getHeaders()
    {
        $headers = array(
            "Content-Type: application/json",
            "Access-Token: ".static::ACCESS_TOKEN
        );

        return $headers;
    }

    private function _getUrl()
    {
        return static::REMOTE_DOMAIN.static::REMOTE_PATH;
    }

    private function _getPreparedRequest()
    {
        $post = array(
            "name"         => $this->_getName(),
            "mobile_phone" => $this->getPhone(),
            "email"        => $this->get("email"),
            "amount"       => $this->_getMoney(),
            "utm_source"   => $this->get("utm_source"),
            "utm_campaign" => $this->get("utm_campaign"),
            "utm_term"     => $this->get("utm_term"),
            "utm_medium"   => $this->get("utm_medium"),
            "utm_content"  => $this->get("utm_content"),
            "date_visit"   => date('Y-m-d H:i:s'),
            "ip"           => $_SERVER['REMOTE_ADDR'].' '.$_SERVER['HTTP_CLIENT_IP'],
        );

        return $post;
    }

    private function getPhone()
    {
        return trim(str_replace(array('(', ")", " ", "-"), "", $this->get('phone')));
    }

    private function _getName()
    {
        return $this->_getCyrillicName($this->get('name'));
    }

    private function _getMoney()
    {
        $money = $this->get('money');

        return str_replace(' ', '', $money);
    }

    private function _getCyrillicName($str)
    {
        $translit = array(
            'а' => 'a',   'б' => 'b',   'в' => 'v',
            'г' => 'g',   'д' => 'd',   'е' => 'e',
            'ё' => 'yo',   'ж' => 'zh',  'з' => 'z',
            'и' => 'i',   'й' => 'j',   'к' => 'k',
            'л' => 'l',   'м' => 'm',   'н' => 'n',
            'о' => 'o',   'п' => 'p',   'р' => 'r',
            'с' => 's',   'т' => 't',   'у' => 'u',
            'ф' => 'f',   'х' => 'x',   'ц' => 'c',
            'ч' => 'ch',  'ш' => 'sh',  'щ' => 'shh',
            'ь' => '\'',  'ы' => 'y',   'ъ' => '\'\'',
            'э' => 'e\'',   'ю' => 'yu',  'я' => 'ya',
            'А' => 'A',   'Б' => 'B',   'В' => 'V',
            'Г' => 'G',   'Д' => 'D',   'Е' => 'E',
            'Ё' => 'YO',   'Ж' => 'Zh',  'З' => 'Z',
            'И' => 'I',   'Й' => 'J',   'К' => 'K',
            'Л' => 'L',   'М' => 'M',   'Н' => 'N',
            'О' => 'O',   'П' => 'P',   'Р' => 'R',
            'С' => 'S',   'Т' => 'T',   'У' => 'U',
            'Ф' => 'F',   'Х' => 'X',   'Ц' => 'C',
            'Ч' => 'CH',  'Ш' => 'SH',  'Щ' => 'SHH',
            'Ь' => '\'',  'Ы' => 'Y\'',   'Ъ' => '\'\'',
            'Э' => 'E\'',   'Ю' => 'YU',  'Я' => 'YA',

        );

        return strtr($str, array_flip($translit));
    }
}