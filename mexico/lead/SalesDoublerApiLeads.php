<?php
/**
 * @class: SalesDoublerApiLeads
 * @params: POST
 * @author: nborodulya@varteq.com
 * @date: 30.08.2018
 */
class SalesDoublerApiLeads
{
    private $_post;
    private $_get;
    
    const REMOTE_URL = "http://api.admin.salesdoubler.net/leads/sgroshi/";
    const ACCESS_TOKEN = "mE7AJia6qTrXCEbF6Bo31uoF4wSkhHUZ";
    const AFFICE_CODE = 65264;
    
    public function __construct()
    {
        $this->_post = $_POST;
        $this->_get = $_GET;
    }
    
    public function send()
    {
        $post = $this->_getPreparedRequest();
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, static::REMOTE_URL);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post));  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
        $headers = $this->_getHeaders();
        
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
        $output = curl_exec($ch);
        
        curl_close($ch);
        
        print_r($output);
        
        return true;
    }
    
    public function get($key)
    {
        if (!array_key_exists($key, $this->_post)) {
            throw new Exception("Key: ".$key." Not Found");
        }
        
        return $this->_post[$key];
    }
    
    public function getRequest($key)
    {
        if (!empty($this->_get[$key])) {
            return $this->_get[$key];
        }
        
        return false;
    } // end getRequest
    
    public function getUrl()
    {
        $source = $this->getRequest('utm_source');
        $promo = $this->getRequest('utm_medium');
        $campaign = $this->getRequest('utm_campaign');
        $tid1 = $this->getRequest('utm_content');
        $tid2 = $this->getRequest('utm_term');
        
        
        $url = sprintf(
            "?source=%s&promo=%s&campaign=%s&tid1=%s&tid2=%s",
            $source,
            $promo,
            $campaign,
            $tid1,
            $tid2
        );
        
        return $url;
    } // end getUrl
    
    private function _getPreparedRequest()
    {
        $post = array(
            "affice_code"  => static::AFFICE_CODE,
            "name"         => $this->getName(),
            "mobile_phone" => $this->getPhone(),
            "email"        => $this->get("email"),
            "credit_sum"   => $this->get("money")
        );
        
        return $post;
    }
    
    private function getPhone()
    {
        return trim(str_replace(array('(', ")", " ", "-"), "", $this->get('phone')));
    }
    
    private function getName()
    {
        return $this->_getCyrillicName($this->get('name'));
    }
    
    private function _getHeaders()
    {
        $headers = array(
            "Content-Type: application/json",
            "Access-Token: ".static::ACCESS_TOKEN
        );
        
        return $headers;
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