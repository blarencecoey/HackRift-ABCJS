import { useState } from 'react';

const Tribe = () => {
    const [joined, setJoined] = useState({});

    const toggleJoin = (id) => {
        setJoined(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const communities = [
        { id: 1, name: "Hiking Buddies", members: 128 },
        { id: 2, name: "Coding Mentors", members: 342 },
        { id: 3, name: "Career Switchers", members: 89 },
    ];

    return (
        <div className="page tribe-page">
            <h1>Find Your Tribe</h1>
            <div className="community-list">
                {communities.map(c => (
                    <div key={c.id} className="card community-card">
                        <div className="community-info">
                            <h3>{c.name}</h3>
                            <span>{c.members} members</span>
                        </div>
                        <button
                            className={`btn-sm ${joined[c.id] ? 'btn-outline' : 'btn-primary'}`}
                            onClick={() => toggleJoin(c.id)}
                        >
                            {joined[c.id] ? 'Joined' : 'Join'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tribe;
