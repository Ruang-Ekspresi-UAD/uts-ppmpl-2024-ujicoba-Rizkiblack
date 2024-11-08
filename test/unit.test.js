const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Memuat HTML yang akan diuji
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

describe('Testing HTML Structure', () => {
  it('should have a <title> with text "Document"', () => {
    const title = document.querySelector('title');
    expect(title.textContent).to.equal('Document');
  });

  it('should have a navigation bar with 3 links', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    expect(navLinks).to.have.lengthOf(3);
    expect(navLinks[0].textContent).to.include('Sobre mim');
    expect(navLinks[1].textContent).to.include('My Hobbies');
    expect(navLinks[2].textContent).to.include('Contact Me');
  });

  it('should have an <h1> with the text "Bem vindos tonis mansos!"', () => {
    const h1 = document.querySelector('h1');
    expect(h1.textContent).to.equal('Bem vindos tonis mansos!');
  });

  it('should have a profile image with width 200', () => {
    const img = document.querySelector('img');
    expect(img).to.not.be.null;
    expect(img.getAttribute('src')).to.equal('images/profile.jpg');
    expect(img.getAttribute('width')).to.equal('200');
  });

  it('should have a footer with copyright text', () => {
    const footer = document.querySelector('footer p');
    expect(footer.textContent).to.include('© 2024 [Jorge Conde]. All rights reserved.');
  });
});
