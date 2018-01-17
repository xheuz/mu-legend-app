import React, { Component } from 'react';
import './endlesstower.css';

class EndlessTower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stages: []
        };
    }

    isBoss = (mobs) => {
        for(var key in mobs) {
            if(mobs[key].is_boss) {
                return mobs[key].is_boss;
            }
        }
        return false;
    }

    dataMerge (data) {
        let d = {};

        for(var pos in data) {
            let record = data[pos];
            if(record.stage_id in d) {
                if(!!record.auras_id) {
                    if(record.auras_id in d[record.stage_id].auras) {
                        let times = d[record.stage_id].auras[record.aura.id]['times'];
                        d[record.stage_id].auras[record.aura.id]['times'] = times + 1;
                    } else {
                        d[record.stage_id].auras[record.aura.id] = {name: record.aura.name, times: 1};
                    }
                }
                if(!!record.mobs_id) {
                    if(record.mobs_id in d[record.stage_id].mobs) {
                        let times = d[record.stage_id].mobs[record.mob.id]['times'];
                        d[record.stage_id].mobs[record.mob.id]['times'] = times + 1;
                    } else {
                        d[record.stage_id].mobs[record.mob.id] = record.mob;
                        d[record.stage_id].mobs[record.mob.id]['times'] = 1;
                        delete d[record.stage_id].mobs[record.mob.id]['id'];
                    }
                }
            } else {
                d[record.stage_id] = record.stage;
                d[record.stage_id]['auras'] = {};
                d[record.stage_id]['mobs'] = {};

                if(!!record.auras_id) {
                    d[record.stage_id].auras[record.aura.id] = {name: record.aura.name, times: 1};
                }
                if(!!record.mobs_id) {
                    d[record.stage_id].mobs[record.mob.id] = record.mob;
                    d[record.stage_id].mobs[record.mob.id]['times'] = 1;
                    delete d[record.stage_id].mobs[record.mob.id]['id'];
                }
            }
        }

        let stages = [];
        
        for(var stage in d){
            stages.push(d[stage]);
        }

        this.setState({stages: stages});
    }

    componentWillMount() {
        this.EndlessTowerStages();
    }

    EndlessTowerStages() {
        fetch(this.props.api + '/endless')
        .then( (results) => results.json())
        .then(results => {
            this.dataMerge(results.data);
        });
    }

    render() {
        return (
            <div className="cover">
                <div className="cover-image" style={{ backgroundImage: "url(https://i.ytimg.com/vi/_j01yLUg5Sc/maxresdefault.jpg)" }}>
                    <div className="class-name">- Endless Tower -</div>
                </div>
                <StageList stages={this.state.stages} isBoss={this.isBoss} />
            </div>
        );
    }
}

const Stage = (props) => {
    let auras = Object.keys(props.stage.auras);
    let mobs = Object.keys(props.stage.mobs);
    let is_boss = props.isBoss(props.stage.mobs);

    return (
        <div className={"stage" + (is_boss ? ' gradient-grey' : '')} >
            {is_boss ? <span className="stage-boss gradient-orange">Boss</span> : ''}
            <div className="stage-id">{props.stage.id}</div>
            {/* <div className="stage-map">
                <img className="image-responsive" src={"http://mulhead.net/template/assets/mu/endless_tower/floor_" + ("000".slice(props.stage.id.toString().length) + props.stage.id.toString()) + ".png"} />
            </div> */}
            <div className="stage-body">
                <span className="stage-row-title">Mobs</span> {mobs.map((mob, i) => <Mob key={i} mob={props.stage.mobs[mob]} />)}
                <br />
                <span className="stage-row-title">Auras</span> {auras.map((aura, i) => <Aura key={i} aura={props.stage.auras[aura]} />)}
            </div>
        </div>
    )
}

const StageList = (props) => {
    return (
        <div>
            {props.stages.map((stage, i) => <Stage key={i} stage={stage} isBoss={props.isBoss} />)}
        </div>
    )
}

const Aura = ({aura}) => {
    return (
        <div className="aura">
            {aura.name} {aura.times > 1 ? 'x ' + aura.times : ''}
        </div>
    )
}

const Mob = ({mob}) => {
    return (
        <div className="mob">
            <span className={"mob-type " + mob.mob_type.type.toLowerCase()}>{mob.mob_type.type}</span>
            <span className={"mob-details" + (mob.is_boss ? " gradient-orange" : '')}>{mob.name} {mob.times > 1 ? 'x ' + mob.times : ''}</span>
        </div>
    )
}

export default EndlessTower;