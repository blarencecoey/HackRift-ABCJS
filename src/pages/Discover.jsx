const Discover = () => {
    return (
        <div className="page discover-page">
            <h1>Discover Yourself</h1>
            <div className="assessment-list">
                <div className="card assessment-card">
                    <h2>Hawker Centre Personality</h2>
                    <p>Find out which local dish represents your vibe.</p>
                    <button className="btn-primary">Start Quiz</button>
                </div>
                <div className="card assessment-card">
                    <h2>Strengths Finder</h2>
                    <p>Uncover your top 5 core strengths.</p>
                    <button className="btn-primary">Start Assessment</button>
                </div>
            </div>
        </div>
    );
};

export default Discover;
