import React from 'react';
import ReactDOM from 'react-dom';
import { Panel, PanelHeading, PanelBlock, Columns, Column, Select, Field, Label, Control } from 'bloomer';
import SpriteData from '../../configs/sprites';
import Game from '../../game';
import { ANIMATIONS, BATTLE_ANIMATIONS } from '../../entities/mainplayer/settings';

const bodies = SpriteData.bodies.male.concat(SpriteData.bodies.female);
const animations = Object.keys(ANIMATIONS).concat(Object.keys(BATTLE_ANIMATIONS));

export default class extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      body: 'male_light2',
      hair: '',
      eyes: '',
      currentAnimation: 'walk_down'
    };
    this.player = new (Game.references.entities.MainPlayer)(0, 0, {
      image: this.state.body
    });
    me.game.world.addChild(this.player);
  }

  setAttribute(attr, value)
  {
    let data = {};
    data[attr] = value;

    data = Object.assign({}, this.state, data);

    me.game.world.removeChild(this.player);
    this.player = new (Game.references.entities.MainPlayer)(0, 0, {
      image: data.body
    });

    me.game.world.addChild(this.player);

    if (data.hair)
    {
      this.player.addCompositionItem({
        name: data.hair,
        image: data.hair,
        width: 64,
        height: 64,
        slot: 'hair',
      });
    }

    if (data.eyes)
    {
      this.player.addCompositionItem({
        name: data.eyes,
        image: data.eyes,
        width: 64,
        height: 64,
        slot: 'eyes',
      });
    }

    this.player.state.animations.isAnimating = true;
    this.player.triggerAnimation( data.currentAnimation || 'walk_down', true );

    this.setState(data);
  }

  render()
  {
    return (
      <Panel>

        <PanelHeading>Sprite Customization</PanelHeading>
        <PanelBlock>
          <Columns>
            <Column>
              <Field>
                <Label>Body</Label>
                <Control>
                  <Select value={this.state.body} onChange={(e) => this.setAttribute('body', e.target.value) }>
                    <option>default</option>
                    { bodies.map((b) => {
                      return (
                        <option>{b}</option>
                      );
                    }) }
                  </Select>                  
                </Control>
              </Field>
            </Column>
            <Column>
              <Field>
                <Label>Hair</Label>
                <Control>
                  <Select value={this.state.hair} onChange={(e) => this.setAttribute('hair', e.target.value) }>
                    <option>default</option>
                    { SpriteData.hair.male.map((b) => {
                      return (
                        <option>{b}</option>
                      );
                    }) }
                  </Select> 
                </Control>
              </Field>           
            </Column>
            <Column>
              <Field>
                <Label>Eyes</Label>
                <Control>
                  <Select value={this.state.eyes} onChange={(e) => this.setAttribute('eyes', e.target.value) }>
                    <option>default</option>
                    { SpriteData.eyes.map((b) => {
                      return (
                        <option>{b}</option>
                      );
                    }) }
                  </Select>                 
                </Control>
              </Field>
            </Column>
          </Columns>
        </PanelBlock>
  
        <PanelHeading>Preview</PanelHeading>
        <PanelBlock>
          <Columns>
            <Column>
              <Field>
                <Label>Animation</Label>
                <Control>
                  <Select value={this.state.currentAnimation} onChange={(e) => this.setAttribute('currentAnimation', e.target.value) }>
                    <option></option>
                    { animations.map((b) => {
                      return (
                        <option>{b}</option>
                      );
                    }) }
                  </Select>                  
                </Control>
              </Field>
            </Column>
          </Columns>
        </PanelBlock>
       
      </Panel>
    );
  }

}