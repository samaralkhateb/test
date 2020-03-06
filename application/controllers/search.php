<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class search extends CI_Controller {

	public function index()
	{
		$this->load->view('web');
	}

  public function news()
  {
    $this->load->view('news');
  }

  public function trends()
  {
    $this->load->view('trends');
  }

  public function places()
  {
    $this->load->view('places');
  }

  public function bazaar()
  {
    $this->load->view('bazaar');
  }

  public function academia()
  {
    $this->load->view('academia');
  }
}
