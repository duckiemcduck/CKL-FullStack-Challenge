import React from "react";

class Navbar extends React.Component
{

    onSubjectClick(id)
    {
        this.props.changeSubject(id)
    }

    render()
    {

        //console.log("navbar object:" + this.props.subjects)
        ///mobile
        var subjectsDropdown = this.props.subjects.map(
        (subject, index) =>
        {
            var divStyle = 
            { 
                color: `black`,
                hyphens: 'auto'
            };
            //console.log(subject)
            var key
            if (subject.id == null)
                key = -1
            else
                key = subject.id
            return ( 
                        <li key={key} style={divStyle}> 
                            <a onClick={ () => this.onSubjectClick(subject.id)}>{ subject.name.toUpperCase()}</a>
                        </li> 
                    )
        })
        ///desktop
        var subjectsMenu = this.props.subjects.map(
            (subject, index) =>
            {
                var key
                if (subject.id == null)
                    key = -1
                else
                    key = subject.id
                var divStyle = 
                { 
                    color: `black`, marginRight: 15
                };
                return (
                        <span key={key} style={divStyle}> 
                            <span>{' '}</span>
                            <a onClick={() => this.onSubjectClick(subject.id)}>{ subject.name.toUpperCase() }</a>
                            <span>{' '}</span>
                        </span> 
                            
                    )
            })
        return (
                    <section id="navbar">
                        <div id="menu-container">
                            <img id ="menu" src="./static/menu.png"></img>
                            <div className="header-menu-dropdown" >
                                <ul>
                                    { subjectsDropdown }
                                </ul>
                            </div>
                        </div>
                        <div id="header">
                            <a onClick={()=> this.onSubjectClick("null")}>
                                <img id ="logo" src="./static/logo.png"></img>
                            </a>
                        </div>
                        <div id="desktop-subject-list">
                                { subjectsMenu }
                        </div>
                    </section>
                );
    }
}
export default Navbar
