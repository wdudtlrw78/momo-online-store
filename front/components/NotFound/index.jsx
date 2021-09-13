import React from 'react';

function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div>
          <h1>
            404 Error <span style={{ fontWeight: '400' }}>Page Not Found</span>
          </h1>
        </div>
        <div>
          <p>Sorry we couldn&apos;t find this page.</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
