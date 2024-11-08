const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Load the HTML to test
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

describe('Integration Testing for HTML Page', () => {
  it('should have sections linked by navigation links', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = ['sobre mim', 'hobbies', 'contact'];

    navLinks.forEach((link, index) => {
      const href = link.getAttribute('href').substring(1);
      expect(href).to.equal(sections[index]);
      const section = document.getElementById(href);
      expect(section).to.not.be.null;
    });
  });

  it('should ensure that each section has a heading and some content', () => {
    const sectionHeadings = {
      'sobre mim': 'Sobre mim',
      'hobbies': 'Passatempos',
      'contact': 'Contact Me',
    };

    Object.keys(sectionHeadings).forEach(id => {
      const section = document.getElementById(id);
      expect(section).to.not.be.null;
      
      // Periksa apakah elemen <h2> ada sebelum mengakses textContent
      const heading = section ? section.querySelector('h2') : null;
      expect(heading).to.not.be.null;
      if (heading) {
        expect(heading.textContent).to.equal(sectionHeadings[id]);
      }
    });
  });

  it('should have a working profile image with correct alt text and dimensions', () => {
    const img = document.querySelector('img');
    expect(img).to.not.be.null;
    expect(img.getAttribute('src')).to.equal('images/profile.jpg');
    expect(img.getAttribute('alt')).to.equal('Profile Picture');
    expect(img.getAttribute('width')).to.equal('200');
  });

  it('should have a footer with copyright text', () => {
    const footer = document.querySelector('footer p');
    expect(footer.textContent).to.include('© 2024 [Jorge Conde]. All rights reserved.');
  });
});
