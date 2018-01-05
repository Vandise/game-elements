import React from 'react';
import ReactDOM from 'react-dom';
import { Panel, PanelHeading, PanelBlock, Columns, Column, Select, Field, Label, Control } from 'bloomer';
import SpriteData from '../../configs/sprites';
import Game from '../../game';

const bodies = SpriteData.bodies.male.concat(SpriteData.bodies.female);
/*
const playerX = me.game.world.width / 2;
const playerY = me.game.world.height / 2;
*/

export default class extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      body: '',
      player: null
    };
    console.log(Game);
  }

  setAttribute(attr, value)
  {
    let data = {};
    data[attr] = value;

    data = Object.assign({}, this.state, data);

    if (this.state.player != null)
    {
      me.game.world.removeChild(this.state.player);
    }

    const x = me.game.world.width / 2;
    const y = me.game.world.height / 2;

    data.player = new (Game.references.entities.MainPlayer)(x, y, {
      image: data.body
    });
    data.player.state.animations.isAnimating = true;
    data.player.triggerAnimation( data.currentAnimation || 'walk_down', true );

    me.game.world.addChild(data.player);

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
                    <option></option>
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
                  <Select>
                    <option>default</option>
                  </Select>
                </Control>
              </Field>           
            </Column>
            <Column>
              <Field>
                <Label>Eyes</Label>
                <Control>
                  <Select>
                    <option>default</option>
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