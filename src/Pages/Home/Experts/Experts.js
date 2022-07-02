import React from 'react';
import expert1 from '../../../img/experts/expert-1.jpg';
import expert2 from '../../../img/experts/expert-2.jpg';
import expert3 from '../../../img/experts/expert-3.jpg';
import expert4 from '../../../img/experts/expert-4.jpg';
import expert5 from '../../../img/experts/expert-5.jpg';
import expert6 from '../../../img/experts/expert-6.png';
import Expert from '../Expert/Expert';

const experts = [
    {id: 1, name: 'Will Smith', img: expert1},
    {id: 2, name: 'Chris Rock', img: expert2},
    {id: 3, name: 'Dwayne Rock', img: expert3},
    {id: 4, name: 'Lionel Messi', img: expert4},
    {id: 5, name: 'Cristiano Ronaldo', img: expert5},
    {id: 6, name: 'Neymar Actor', img: expert6}
]

const Experts = () => {
    return (
        <div id='experts' className='container mt-4 mb-4'>
            <h2 className='text-primary text-center'>Our Experts</h2>
            <hr className="border-primary border-5 opacity-100 mb-3"/>
            <div className="row">
                {
                    experts.map(expert => <Expert
                    key={expert.id}
                    expert={expert}
                    ></Expert>)
                }
            </div>
        </div>
    );
};

export default Experts;