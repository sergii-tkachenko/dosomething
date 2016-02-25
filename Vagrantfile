Vagrant.configure("2") do |config|

  ## Choose your base box
  config.vm.box = "dosomething/phoenix"
  config.vm.box_version = "1.0.5"

  config.vm.provider "virtualbox" do |v|
    v.customize ["modifyvm", :id, "--memory", 3072]
    # Fixes slow DNS on virtual Ubuntu 14.04.
    v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
  end

  # Use custom created user to manage vagrant.
  config.ssh.username = 'dosomething'

  # Since authorized keys were prepopulated, vagrant needs a path to your key.
  config.ssh.private_key_path = '~/.ssh/id_rsa'

  # SSH Agent forwarding
  config.ssh.forward_agent = true

  # Mount shared folders
  if ENV['DS_VAGRANT_MOUNT_NFS']
    # NFS
    config.vm.network :private_network, ip: "10.11.12.13"
    config.vm.synced_folder ".", "/var/www/dev.dosomething.org", type: "nfs"
  else
    # SSHFS -- reverse mount from within Vagrant box
    config.sshfs.paths = { "/var/www/dev.dosomething.org" => "../dosomething-mount" }
  end
  config.vm.synced_folder "/Users/sergii/Development/mb/mbc-digest-email", "/var/www/mb-php/mbc-digest-email"
  config.vm.synced_folder "/Users/sergii/Development/mb/mbp-user-digest", "/var/www/mb-php/mbp-user-digest"
  config.vm.synced_folder "/Users/sergii/Development/mb/mb-sercure-config/dev", "/var/www/mb-php/mb-sercure-config"
  # sudo ln -nvfs /var/www/mb-php/mb-sercure-config/mb-secure-config.inc /var/www/mb-php/messagebroker-config/mb-secure-config.inc
  # ssh -L \*:4723:10.100.25.44:4722 aws-admin

  # Allow `npm link` for Neue
  if File.exists?("/usr/local/lib/node_modules/@dosomething/forge")
    config.vm.synced_folder "/usr/local/lib/node_modules/@dosomething/forge",
      "/usr/local/lib/node_modules/@dosomething/forge",
      owner: "www-data", group: "www-data"
  end

  # Http and https.
  config.vm.network :forwarded_port, guest: 80, host: 8888
  config.vm.network :forwarded_port, guest: 443, host: 8889

  config.vm.host_name = "dev.dosomething.org"

  # With Varnish
  config.vm.network :forwarded_port, guest: 6081, host: 9999

  # Rabbit
  config.vm.network :forwarded_port, guest: 15672, host: 15672

  # Solr.
  config.vm.network :forwarded_port, guest: 8983, host: 8983

  config.vm.provision :shell, :inline => 'more /vagrant/scripts/install_complete.txt'
end

