import React from 'react';
//npm install mdb-react-ui-kit
//npm install @fortawesome/fontawesome-free
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; // Uvoz stilova za MDBReact UI kit
import '@fortawesome/fontawesome-free/css/all.min.css'; // Uvoz stilova za FontAwesome ikone

import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit'; // Uvoz potrebnih komponenti iz MDBReact UI kit-a


import "../stilovi/fontovi/fontovi.css";
import "../stilovi/animacije/animacije.css";

export default function Footer() {
  return (
    <div className='content-wrapper'>
      <MDBFooter className='text-center text-black'>
        <MDBContainer className='p-4 pb-0'>
          <section className='mb-4'>
            {/* Gumb za Facebook */}
            <MDBBtn
              floating
              className='m-1 custom-button'
              style={{ backgroundColor: 'rgba(59, 89, 152, 0.8)' }}
              href='https://www.facebook.com'
              role='button'
            >
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            {/* Gumb za Twitter */}
            <MDBBtn
              floating
              className='m-1 custom-button'
              style={{ backgroundColor: 'rgb(85, 172, 238,0.8)' }}
              href='https://www.twitter.com'
              role='button'
            >
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            {/* Gumb za Google */}
            <MDBBtn
              floating
              className='m-1 custom-button'
              style={{ backgroundColor: 'rgba(221, 75, 57,0.8)' }}
              href='https://www.google.com'
              role='button'
            >
              <MDBIcon fab icon='google' />
            </MDBBtn>
            
            {/* Gumb za Instagram */}
            <MDBBtn
              floating
              className='m-1 custom-button'
              style={{ backgroundColor: 'rgba(172, 43, 172,0.8)' }}
              href='https://www.instagram.com'
              role='button'
            >
              <MDBIcon fab icon='instagram' />
            </MDBBtn>

            {/* Gumb za LinkedIn */}
            <MDBBtn
              floating
              className='m-1 custom-button'
              style={{ backgroundColor: 'rgba(0, 123, 181,0.8)' }}
              href='https://www.linkedin.com'
              role='button'
            >
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

            {/* Gumb za GitHub */}
            <MDBBtn
              floating
              className='m-1 custom-button'
              style={{ backgroundColor: 'rgba(51, 51, 51,0.8)' }}
              href='https://www.github.com'
              role='button'
            >
              <MDBIcon fab icon='github' />
            </MDBBtn>
          </section>
        </MDBContainer>

        {/* Tekstualni dio footera */}
        <div
          className="text-center"
          style={{
            backgroundColor: 'rgba(255, 76, 123, 1)',
            fontSize: '60px',
            color: 'white',
            fontFamily: "'PisanaSlova', 'PisanaSlova', Times, serif, 'PisanaSlova'",
            marginBottom: '20px'
          }}
        >
          Follow us
        </div>
      </MDBFooter>
    </div>
  );
}