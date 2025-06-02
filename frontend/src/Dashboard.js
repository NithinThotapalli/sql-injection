import React from 'react';

function Dashboard() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(120deg, #fff 0%, #232526 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        animation: 'fadein 1.2s cubic-bezier(0.4,0,0.2,1)'
      }}
    >
      <style>
        {`
          @keyframes fadein {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes slideup {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes popin {
            0% { opacity: 0; transform: scale(0.95);}
            60% { opacity: 1; transform: scale(1.03);}
            100% { opacity: 1; transform: scale(1);}
          }
          .dashboard-title {
            animation: popin 1s cubic-bezier(0.4,0,0.2,1);
            text-align: center;
          }
          .dashboard-section {
            animation: slideup 1.2s cubic-bezier(0.4,0,0.2,1);
            text-align: left;
          }
          .dashboard-highlight {
            transition: background 0.3s, color 0.3s;
            cursor: pointer;
          }
          .dashboard-highlight:hover {
            background: #232526;
            color: #fff;
          }
          .dashboard-code {
            animation: popin 1.2s cubic-bezier(0.4,0,0.2,1);
          }
        `}
      </style>
      <h1
        className="dashboard-title"
        style={{
          color: '#232526',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize: 42,
          marginBottom: 24,
          letterSpacing: 1,
          textAlign: 'center',
          alignSelf: 'center',
          animation: 'popin 1s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }}
      >
        What is
        <span style={{
          display: 'inline-block',
          color: '#fff',
          background: '#232526',
          borderRadius: 8,
          padding: '0 14px',
          marginLeft: 16,
          fontSize: 42,
          lineHeight: '52px',
          animation: 'slideup 1.2s cubic-bezier(0.4,0,0.2,1)'
        }}>
          SQL Injection?
        </span>
      </h1>
      <div
        className="dashboard-section"
        style={{
          width: '90vw',
          maxWidth: 900,
          background: '#fff',
          color: '#232526',
          borderRadius: 14,
          boxShadow: '0 4px 32px 0 rgba(0,0,0,0.08)',
          padding: 40,
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 20,
          lineHeight: 1.7,
          marginBottom: 32,
          animationDelay: '0.2s',
          textAlign: 'left'
        }}
      >
        <b>SQL Injection</b> is a critical security vulnerability that allows an attacker to interfere with the queries an application makes to its database.<br /><br />
        <span className="dashboard-highlight" style={{background:'#f5f5f5', borderRadius:6, padding:'2px 8px'}}>It occurs when user input is not properly sanitized and is inserted directly into a SQL query.</span>
        <br /><br />
        <b>Why is it dangerous?</b><br />
        <ul style={{margin: '10px 0 0 18px', color: '#232526'}}>
          <li>Attackers can view, modify, or delete data in your database.</li>
          <li>They may bypass authentication and access sensitive information.</li>
          <li>It can lead to data breaches, data loss, and reputational damage.</li>
        </ul>
        <br />
        <b>Example of a vulnerable query:</b>
        <code className="dashboard-code" style={{
          display: 'block',
          background: '#232526',
          color: '#fff',
          borderRadius: 6,
          padding: '10px 14px',
          margin: '14px 0',
          fontSize: 18
        }}>
          SELECT * FROM users WHERE username = '{'{user}'}' AND password = '{'{pass}'}';
        </code>
        If an attacker enters <span style={{color:'#888'}}>' OR 1=1 --</span> as the username, the query becomes always true, potentially exposing all users.<br /><br />
        <b>Real-world consequences:</b>
        <ul style={{margin: '10px 0 0 18px', color: '#232526'}}>
          <li>In 2012, LinkedIn suffered a breach exposing 6.5 million passwords due to SQL injection.</li>
          <li>Many high-profile data leaks have been traced back to this vulnerability.</li>
        </ul>
        <br />
        <b>How to prevent SQL Injection?</b>
        <ul style={{margin: '10px 0 0 18px', color: '#232526'}}>
          <li><b>Use parameterized queries or prepared statements</b> (never build SQL with string concatenation).</li>
          <li>Validate and sanitize all user input.</li>
          <li>Use ORM libraries that handle SQL safely.</li>
          <li>Limit database permissions for your application.</li>
          <li>Keep your software and dependencies up to date.</li>
        </ul>
      </div>
      <div style={{
        color: '#000',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 17,
        maxWidth: 900,
        textAlign: 'left',
        animation: 'fadein 1.5s cubic-bezier(0.4,0,0.2,1)'
      }}>
        Protect your applications by writing secure code, validating all user input, and following security best practices.<br />
        <span style={{color:'#000', fontWeight:600}}>Stay safe!</span>
      </div>
    </div>
  );
}

export default Dashboard;
