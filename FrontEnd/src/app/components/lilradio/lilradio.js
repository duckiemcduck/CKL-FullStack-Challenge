import React from "react";
import randomMessage from "./utils.js";
export class LilRadio extends React.Component
{
     constructor(props) 
    {
      super(props);
      this.state = {status: 'loading'}
    }
    componentDidMount()
    {
	    //console.log("initial preloader state:" + this.props.status)
    };
    componentWillReceiveProps(nextProps) 
    {
        this.setState({status: this.props.status})
        this.forceUpdate()
    }

    render()
    {
        //console.log("preloader status:" + this.props.status)
        var animationStyle
        {
            switch(this.props.status)
            {
                case 'loading': animationStyle = { animation: "pulse 0.2s" }; break;
                case 'loaded': animationStyle = { animation: "fadeOut 0.5s", transitionDuration: 0.5, transitionProperty: "opacity,visibility", opacity: 0, pointerEvents: "none"}; break;
                case 'failed': animationStyle = { animation: "pulse 0.2s"}; break;
                default:  animationStyle = { animation: "pulse 0.2s" }
            }
            //console.log(animationStyle)
        }
        var preloadText = randomMessage(this.props.status)
        return (
        <div className='preloader' style={animationStyle}>
            <div className='preload-radio'>
                <div className='radio-antenna-container'>
                    <div className='radio-antenna'>
                    <div className='radio-bleep'></div>
                    <div className='radio-bleep2'></div>
                    </div>
                </div>
                <div className='radio-box'>
                    <div className='radio-panel'>
                    <div className='radio-tuner'></div>
                    </div>
                    <div className='radio-speaker'></div>
                </div>
            </div>
            <div className='preload-text'><p>{preloadText.toUpperCase()}</p></div>
        </div>
        );
    }
}
