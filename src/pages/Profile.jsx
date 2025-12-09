const Profile = () => {
    return (
        <div className="page profile-page">
            <div className="profile-header">
                <div className="avatar-placeholder">JB</div>
                <h2>Julian B.</h2>
                <p className="subtitle">Explorer</p>
            </div>

            <div className="section">
                <h3>My Strengths</h3>
                <div className="tags">
                    <span className="tag">Empathy</span>
                    <span className="tag">Strategic</span>
                    <span className="tag">Learner</span>
                </div>
            </div>

            <div className="section">
                <h3>My Results</h3>
                <div className="card">
                    <h4>Hawker Personality</h4>
                    <p>You are <strong>Chicken Rice</strong> - classic, reliable, and loved by all.</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
