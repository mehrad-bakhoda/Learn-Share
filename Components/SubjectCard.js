
const SubjectCard = (props) => {
    const name = props.name;
    const followers = props.followers;
    const resources = props.resources;

    return (
        <div className="customCard subjectCard">
            <h5>
                {name}
            </h5>
            <div className='details'>
            <div className="followers">
               <p> {followers} </p> 
               <i className="far fa-users"></i>
            </div>
            <div className="resources">
               <p> {resources} </p> 
               <i className="far fa-link"></i>
            </div>
            </div>
        </div>
    )
}

export default SubjectCard;