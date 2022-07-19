import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import * as React from 'react'

import {ReactWidget, } from '@jupyterlab/apputils'

import {Panel} from '@phosphor/widgets'

import Tabs from './Tabs'
import Tab from './Tab'


//import {exec} from 'child_process'

import Menu from './components/Menu'


/**
 * Initialization data for the sagemaker-ext extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'sagemaker-ext',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    addSidebar(app)
    console.log('JupyterLab extension sagemaker-ext is activated!');
  }
};

// Create item and add it to left sidebar of JupyterLab
function addSidebar(app: any) {
  const panel = new Panel();
  panel.id = "SDocker";
  panel.title.icon = "AA"
  panel.addWidget(new SDockerWidget());
  app.shell.add(panel, 'left')
}

export class SDockerWidget extends ReactWidget {
  _label:string;
  render(): JSX.Element {
    return (
        <MainComponent />
    );
  }
}

function MainComponent() {
  return(
    <body id='main'>
      <div className='jp-Mainwidget'><h2>SDocker</h2></div>
      <Tabs>
        <Tab title="Hosts"> <CreateHost /> <table><tbody><HostsComponent /></tbody></table> </Tab>
        <Tab title='Images'>Nothing here yet</Tab>
        <Tab title="Containers">No content yet</Tab>
      </Tabs>

    </body>
  )
}

function HostsComponent() {
  /**
   * This needs to get all Hosts and then show them in a list.
   * 
   */

  const instances = [
    ['p3.2xlarge', 'i-23123123', 'active-host', "Running"],
    ['m5.4xlarge', 'i-abcd', 'not-active-host', "Terminating"]
  ]


  return(
    <> {
      instances.map( (item: Array<String>, i) =>
        <DockerHostRow instancetype={item[0]} instanceid={item[1]} contextstatus={item[2]} state={item[3]}/>
      )
    }</>
  )
}

function CreateHost(props: any) {

  return(
    <Menu />

  )
}






function DockerHostRow(props: any) {
  const pauseButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>, instanceID: String) => {
    //console.log(event)
    console.log("Stopping EC2 instance with ID ", instanceID)
  }

  const stopButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>, instanceID: String) => {
    //console.log(event)
    console.log("Terminating EC2 instance with ID ", instanceID)
  }
  
  return(
    <tr>
      <span className='info'>
        <span>Instance Type: {props.instancetype}</span>
      </span>
      <span>
        <span className={props.contextstatus}></span>
        <span className="State">props.state</span>
        <button onClick={event=> pauseButtonClickHandler(event, props.instanceid)}>II</button>
        <button onClick={event => stopButtonClickHandler(event, props.instanceid)}>X</button>
      </span>
    </tr>

  )
}

export default extension;
