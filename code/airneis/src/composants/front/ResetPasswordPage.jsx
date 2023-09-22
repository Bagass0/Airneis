import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    fetch(`http://airneis.ddns.net:3000/compte.php?id=${id}`)
      .then(response => response.json())
      .then(data => {
        setAccountInfo(data.accountInfo);
      });
  }, [id]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, password: password })
    };

    fetch('http://airneis.ddns.net:3000/reset_password.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
            setMessage('Votre mot de passe a été réinitialisé avec succès.');
            setTimeout(() => navigate('/'), 3000);
        } else {
            setMessage('Il y a eu une erreur lors de la réinitialisation de votre mot de passe.');
        }
      });
  };

  return (
    <div className="reset-password-container">
      <h1 className="reset-password-title">Réinitialiser le mot de passe</h1>
      {accountInfo && accountInfo.reset == 1 ? (
        <form onSubmit={handleSubmit} className="reset-password-form">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={handlePasswordChange}
            required
            className="password-input"
          />
          <input
            type="password"
            placeholder="Confirmer le nouveau mot de passe"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="confirm-password-input"
          />
          {message && <p className="message-text">{message}</p>}
          <button type="submit" className="submit-button">
            Mettre à jour le mot de passe
          </button>
        </form>
      ) : (
        <div>
          <p className="invalid-link-text">Lien de réinitialisation obsolète</p>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
