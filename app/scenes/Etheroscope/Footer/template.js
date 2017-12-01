import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 15px 0;
  border-top: 3px solid #4B6575;
`
const EtheroscopeAbout = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 33.3%;
  text-align: center;
`

const CopyrightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 33.3%;
`

const Copyright = styled.p`
  display: flex;
  align-self: center;
  text-align: center;
`

const FooterLogo = styled.img`
  align-self: center;
  width: 200px;
`

const QRCodeWrapper = styled.div`
  width: 33.3%;
  display: flex;
  align-self: center;
  justify-content: center;
`

const QRCode = styled.img`
  width: 150px;
  height: 150px;
`

const Footer = () => {
  return (
    <Wrapper>
      <EtheroscopeAbout>
        <FooterLogo alt="Etheroscope" src="/static/etheroscope-black.png"/>
        HEY! What a wonderful kind of day! Where we learn walk and play, and get along with each other.
      </EtheroscopeAbout>
      <CopyrightWrapper>
        <Copyright>© 2018 Etheroscope. Donations welcome!</Copyright>
      </CopyrightWrapper>
      <QRCodeWrapper>
        <QRCode alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAJfUlEQVR4Xu2d4XbkKgyD2/d/6N6T9tzOJAvhE4rppNX+XYNBFrJxMun729vbx9sL/fv4uH457+/v/+yQ+mmN3Saj4ym0zho3H711Uv9X222IXx9JY5VXB6wHOvUTYs0FM8Qa4BZihVhdBJw0E2KFWCHWHAdKRjVTIa0/3BU5SlJRsCr7pmunRbXiu4U7XY8bM+o7xHpCSgkuDWSINQmwcwJocHo+aNDoGkMsitTerhWHKNbkgaKHgpJfITVNR+6clGYh1gApJRAh1gNMi1j05PVi1wra1cHZfFNyUN9KGqa+qRIodnQ/q+KIU+GqBVECKgSuSB00kAo5HFu6nlVxDLGKayyHLMrYEOsJrQowaDqivpMK9wjQjBLFimIpwtisYVO8T6hlFOsPKhaVZelI3sCY7pvaKVumc946FdJNKsDdwZbum9ope6ZzhlgKqi9iS4NL7ZRt0TlDLAXVF7GlwaV2yrbonCGWguqL2NLgUjtlW3TOX0esii67Avys7aq+Wjrvg9bA9t+rmqGzZFHGhVgKWoPmIwXTfe+c+pnc2iXD3DXS8VGsKBZW5A2qEGui+x3FGovibYk13ppuUQEGrbvcIt9ZO12jcqDoevQojUdYzwrH0+sWFAylLqBBC7H0ePVGhFgDLCnR3ZqGkj+KNUl+Gsgo1h5g2qSkBJ4M3/ewKFYUy+VQczwmVol3OCk9jb0GqaOCv803hLzE7BZfm6moNRwC3oXUJYyBk4ZYT0BFsSBrgFmIFWIBmugmIVaIpbMGjHj/WHUnBYtRGnBunUOXU1HfUd93tguxJloQq0gdYhUj8JOq8ZO+i2EtnT6KFcUqIViIFWLVEKv1nXeln3P1qty7hPJckay9tx6nweri644n++7Z0Pgs+zEF3QxduHqDpP6PdiHWHhEanxBrwLgQK8T6RCCpcFab2bgoFsNpaBXFimJFsYbHxDe4XLGUJdEbE51TaVK25nTW46ZW5wZHg9grASp8Uyxx8U5JoGySzhlijZHCAW/87cbW7HYJQPtY4609LOgm6Zwh1hgpijlV4BBrjDn+lTBNo8Dlt0lFOqLrrPCNCRzFOqcJPeG9WSqCewtitd7HuguYVDnwKRP+drSL0XHtSqFO9+3Y2eVHiDVXG4ZYA6UPsUIsmlo3O6qszddm3NO4qq6gUp9USJE6P2Qh1gHHEOuFiaX0NZSG29GWkmAbp9g6fmiqoGmCzqfQgfqm2UiJdzND0RpLcRRiKZT4sqUBV9oaDoGVeIdYT0g7aueqpRPwEOuAgCPV7umhgaRrDLH2iEaxolg45bqHedmvdGgNobQqFNujatGxLsB6tXXhlV94kkAuN3a7wQGjNzbE0lG1H6uEWA/QqZL0Ts/VBI5ijeupZg276qMgVwc8xBoroHPztdUyxDqvaaJYk4rVeh9rfBbOLZRrOy0aWx5X+aG+qUI46u22OugaFQ605iz58NqqgK/yE2Kd0yzEGvSxlFNKLxnUjpI3iqVEaTLgUazz23Tztma0IJRWUlLh5AGgSkTt/qxiOerQk28FzFWnj/LMKYKdsW4qdHGka8eKFWLtQ0IBdgNZMZ7cxN02S4hFJepgF2Kd13chVoglvYlLD1SIFWKFWE5tMMmf7jB6citqJMe3ux7q234fCzsy+if0EYhCnle8jJCDs9k4a6fxUnpW+A1SJUB0odSOnihljW5bw1nT1SQIsYpvUSHWHALOAVd6aEmFc/Gx3x0nbt13oqjSKqpKiRlikQg3bGjdpwTtV9VYFe9jTcaqO8zuAsOLAz2NUkowP81YoTqUwE4ccR/LceKODbH2CCoHgGBP1ZfM9b9NiPWElhIwakuDpqRM6psSga6Rzvep6EmFD7iUgFFbGrQQS6HtRbZJhUmFnwgop88pJOlLdBXrob5bZ4uuR2k3UGV01tPTiT/xzjtNUVRMK4IbYlH0D3YUOHqV7i2DqkbFeqhvRyEqSO2sJ4q1gOgh1vmlp+RWWKEQ9KQlFeppxonXZ2uh0QQu+SNNTopTNvlqBStdu0t+uu8VqtpNjxV/8iTEOleNEEtX1e4I55QpRSNdMlUXxTedM8SiUQJ2IdZ5sUtJ2atpnBqUjgVh/jZJjaWg9WTrqI4z9tcRS+mp0BpLOaV0Tnr6aHCVfTtzOoX2tmd3/BE3+zEaLd4VgCkJQqwHUi4x3PEh1iAdRbHOazma+aNYACl6mqmdknronNSut113fBQritXk1m2JpfRzgIh0Ta4GyD3hSkqg+6a1JW3RUL8uFtJ4WryHWHsEnKCHWOAoOAA7hTZY2qkJVcYo1hjpJpZRrPNbVIgVYo0ReLKIYhX30KJYUSx6yKTifdWfPJHk5GCs1HG0MKbrcZ84tPwo+6F1qLsf2sei+7G/3UA35NgpgQixzpGmWCo4Nt8gjWLNBUIB/uiBBldJPfTgUt/K/kIsiv6TXVLhGLQQa4zRPxYh1hg0/GOK8VR1Fq4E02KXvjvV2ylNKRVI0VsctaOYbXYUt5Kffzlghlhj9ChhqF2INdmGoABXkHpME93C2Q9VWuWJA36ko2/1uhEVwXUCkVS4RyCp8AmPEOsBxo8qlqIajlZh9ne+40kJo9QQd+g5OfGpIFYL32U//2o6Nz46u80XYunHOsSabFK6wEWxvhBQivco1qDuoqqq6ERF2qqY87inEOvCFkSI9UBgGbFoiumdZloPUTtXNejFYVW7oWLfFCNFASkPcPFOJwyxaDj3diHWHG74BlcBMJ2z4uRSuOga6XyKXcW+o1gTBf02xFVwUixf7UPJJm4JEGKFWNJ3+SnZb00sJ33QsUqaUNIPsaVB7PWd6AWF2ilKHWI9RVgBmBDDtQmxAIKOQihvcdJgOOsB273EhO4ligWamTTgCpitKFM/SYV79CjZkwqTCvHrxn+mxqJKRPOSUmNR26vtlDZAhSrj/dCf2FMJVHoleJHw7yr30mOI9UCAYm4TOMSaA50G6Go7O+DwHTjbT4gVYikXFHxQQqwQK8QCxZIC0nE6ehp7tyOnWFZ8t2Cg46ndslQIYiqbrNokDYRyy6SXGUp0Ol/F5UgJHI0Z7mMpzqktXaR7ekKsBwKU6C7mIdbgFLiv6NJARrGoHAG7KNb5xQFA+G3i1HeKHxqzKFYUS+EVfvxzi6/NKGni6tTjpkIaNbpupfahvhU7us4Qq1ixaNBowEIsiujBjtYKyrX7J2+FFIYQiyI1aRdizQGnlAtzHr5G0QOQVJhUKPGMEus/tbbH16jvnHQAAAAASUVORK5CYII=" />
      </QRCodeWrapper>
    </Wrapper>
  )
}

export default Footer
