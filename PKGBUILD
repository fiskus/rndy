# Maintainer: Maxim Chervonny <fiskus@chervonny.ru>

pkgname=psw-git
pkgver=20121105
pkgrel=1
pkgdesc="Utility for managing passwords"
arch=('any')
url="https://github.com/fiskus/password-manager"
license=('GPL')
depends=('bash' 'git' 'xclip')
provides=('psw')
conflicts=('psw')

_gitroot="git://github.com/fiskus/password-manager.git"
_gitname="psw"

build() {
  cd "$srcdir"
  msg "Connecting to GIT server...."

  if [ -d $_gitname ] ; then
    cd $_gitname && git pull origin
    msg "The local files are updated."
  else
    git clone $_gitroot
    cd $_gitname
  fi

  msg "GIT checkout done or server timeout"

  mkdir -p ${pkgdir}/usr/bin
  cp dotploy.sh ${pkgdir}/usr/bin
}
