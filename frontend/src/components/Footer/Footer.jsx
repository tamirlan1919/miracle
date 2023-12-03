import { Footer } from 'flowbite-react';
import img from './Frame 1 (3).svg';

function FooterComp() {
  return (
    <Footer >
      <div className="py-5 w-full container text-center">
        <div className="w-full  justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="/"
            src={img}
            className='max-w-[150px]'
            alt="Flowbite Logo"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Flowbite™" year={2022} />
      </div>
    </Footer>
  );
}

export default FooterComp