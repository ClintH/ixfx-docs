import {FunctionalComponent, Component} from 'preact';
import {h, Fragment} from 'preact';
import {useState, useEffect} from 'preact/hooks';

type ClockProps = {
  title: string;
}

type ClockState = {
  toggled: boolean
}

export default class Clock extends Component<ClockProps, ClockState> {
  constructor(props: ClockProps) {
    super(props);
    console.log('ctor');
    this.state = {
      toggled: false,
      title: `default`
    };
  }

  // Lifecycle: Called whenever our component is created
  componentDidMount() {
    console.log('componentDidMount');
    // update time every second
    // this.timer = setInterval(() => {
    //   this.setState({time: Date.now()});
    // }, 1000);
  }

  // Lifecycle: Called just before our component will be destroyed
  componentWillUnmount() {
    // stop when not renderable
    //clearInterval(this.timer);
  }

  render() {
    return (<div>toggled title: {this.state.title}</div>);
  }
}