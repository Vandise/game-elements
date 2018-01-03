import React from 'react';
import { Box, Container, Panel, PanelHeading, PanelBlock, Columns, Column, Select,
         Field, Label, Control } from 'bloomer';
import * as playerConfigs from '../../client/configs/player';
import Items from '../../client/configs/items';


const BASE_STAT = playerConfigs.BASE_STAT;
const DEFAULT_LEVEL = 1;

export default class PlayerPanel extends React.Component
{

  constructor(props)
  {
    super(props);
    this.player = props.player;
    this.state = {
      level: DEFAULT_LEVEL,
      boon: '',
      bane: '',
      renderState: 'default',
      stats: Object.assign(Object.create(Object.getPrototypeOf(playerConfigs.STATS)), playerConfigs.STATS)
    };
  }

  setPlayerValue(field, value)
  {
    const obj = {};
    obj[field] = value;
    this.player.stats.setStatSetting(field, value);
    this.player.stats.calculateBaseStats();
    this.setState(
      Object.assign({}, this.state, obj)
    );
  }

  setRenderState(value)
  {
    this.setState(
      Object.assign({}, this.state, { renderState: value })
    );
    this.player.state.renderState = value;
  }

  equipItem(itemConfigs, slot)
  {
    if (itemConfigs)
    {
      itemConfigs['name'] = itemConfigs['image'];
      this.player.addCompositionItem(itemConfigs);
    }
    else
    {
      this.player.removeCompositionItem(slot);
    }
    this.forceUpdate();
  }

  render()
  {
    return (
      <Panel>

        <PanelHeading>Player Admin Panel</PanelHeading>

        <PanelBlock>
          <Columns>
            <Column>
              <Field>
                <Label>Level: {this.state.level}</Label>
                <Control>
                  <input type="range" min="1" max="80" value={this.state.level} onChange={(e) => this.setPlayerValue('level', e.target.value) } className="slider"/>
                </Control>
              </Field>
            </Column>
            <Column>
              <Field>
                <Label>Render State</Label>
                <Control>
                  <Select value={this.state.renderState} onChange={(e) => this.setRenderState(e.target.value) }>
                    <option>default</option>
                    <option>battle</option>
                  </Select>
                </Control>
              </Field>           
            </Column>
          </Columns>
        </PanelBlock>
        <PanelBlock>
          <Columns>
            <Column>
              <Field>
                <Label>Boon</Label>
                <Control>
                  <Select value={this.state.boon} onChange={(e) => this.setPlayerValue('boon', e.target.value) }>
                    <option></option>
                    { Object.keys(this.state.stats).map((k) => {
                      return(
                        <option>{k}</option>
                      );
                    }) }
                  </Select>
                </Control>
              </Field>
            </Column>
            <Column>
              <Field>
                <Label>Bane</Label>
                <Control>
                  <Select value={this.state.bane} onChange={(e) => this.setPlayerValue('bane', e.target.value) }>
                    <option></option>
                    { Object.keys(this.state.stats).map((k) => {
                      return(
                        <option>{k}</option>
                      );
                    }) }
                  </Select>
                </Control>
              </Field>
            </Column>
          </Columns>
        </PanelBlock>

        <PanelHeading>Stats</PanelHeading>

        <PanelBlock>
          <Columns>
            <Column>
              <Label>Health</Label>
              <p>{this.player.stats.getMaxHP()}</p>
            </Column>
            <Column>
              <Label>P.Attack</Label>
              <p>{this.player.stats.getpAttack()}</p>
            </Column>
            <Column>
              <Label>P.Defense</Label>
              <p>{this.player.stats.getpDefense()}</p>
            </Column>
          </Columns>
        </PanelBlock>

        <PanelBlock>
          <Columns isCentered>
            <Column>
              <Label>MP</Label>
              <p>{this.player.stats.getMaxMP()}</p>
            </Column>
            <Column>
              <Label>M.Attack</Label>
              <p>{this.player.stats.getmAttack()}</p>
            </Column>
            <Column>
              <Label>M.Defense</Label>
              <p>{this.player.stats.getmDefense()}</p>
            </Column>
          </Columns>
        </PanelBlock>

        <PanelBlock>
          <Columns isCentered>
            <Column>
                <Label>Strength</Label>
                <p>{this.player.stats.getStat('strength')}</p>
            </Column>
            <Column>
                <Label>Agility</Label>
                <p>{this.player.stats.getStat('agility')}</p>
            </Column>
            <Column>
                <Label>Intelligence</Label>
                <p>{this.player.stats.getStat('intelligence')}</p>
            </Column>
            <Column>
                <Label>Vitality</Label>
                <p>{this.player.stats.getStat('vitality')}</p>
            </Column>
          </Columns>
        </PanelBlock>

        <PanelHeading>Equipment</PanelHeading>

        <PanelBlock>
          <Columns isCentered>
            <Column isSize="1/3">
              <Field>
                <Label>Neck</Label>
                <Control>
                  <Select>
                    <option></option>
                  </Select>
                </Control>
              </Field>
            </Column>
            <Column isSize="1/3">
              <Field>
                <Label>Head</Label>
                <Control>
                  <Select onChange={(e) => this.equipItem(Items.male.head[e.target.value], 'head') }>
                    <option></option>
                    { Object.keys(Items.male.head).map((k) => {
                      return(
                        <option>{k}</option>
                      );
                    }) }
                  </Select>
                </Control>
              </Field>
            </Column>
            <Column isSize="1/3">
              <Field>
                <Label>Back</Label>
                <Control>
                  <Select onChange={(e) => this.equipItem(Items.unisex.back[e.target.value], 'back') }>
                    <option></option>
                    { Object.keys(Items.unisex.back).map((k) => {
                      return(
                        <option>{k}</option>
                      );
                    }) }
                  </Select>
                </Control>
              </Field>
            </Column>
          </Columns>
        </PanelBlock>

        <PanelBlock>
          <Columns isCentered>
            <Column isSize="1/3">
              <Field>
                <Label>Weapon</Label>
                <Control>
                  <Select onChange={(e) => this.equipItem(Items.weapons.swords[e.target.value], 'weapon') }>
                    <option></option>
                    { Object.keys(Items.weapons.swords).map((k) => {
                      return(
                        <option>{k}</option>
                      );
                    }) }
                  </Select>
                </Control>
              </Field>
            </Column>
            <Column isSize="1/3">
              <Field>
                <Label>Body</Label>
                <Control>
                  <Select onChange={(e) => this.equipItem(Items.male.body[e.target.value], 'body') }>
                    <option></option>
                    { Object.keys(Items.male.body).map((k) => {
                      return(
                        <option>{k}</option>
                      );
                    }) }
                  </Select>
                </Control>
              </Field>
            </Column>
            <Column isSize="1/3">
              <Field>
                <Label>Off-hand</Label>
                <Control>
                  <Select>
                    <option></option>
                  </Select>
                </Control>
              </Field>
            </Column>
          </Columns>
        </PanelBlock>

        <PanelBlock>
          <Columns isCentered>
            <Column isSize="1/4">
              <Field>
                <Label>Gloves</Label>
                <Control>
                  <Select onChange={(e) => this.equipItem(Items.male.gloves[e.target.value], 'gloves') }>
                    <option></option>
                    { Object.keys(Items.male.gloves).map((k) => {
                      return(
                        <option>{k}</option>
                      );
                    }) }
                  </Select>
                </Control>
              </Field>
            </Column>
            <Column isSize="1/4">
              <Field>
                <Label>Arms</Label>
                <Control>
                  <Select onChange={(e) => this.equipItem(Items.male.arms[e.target.value], 'arms') }>
                    <option></option>
                    { Object.keys(Items.male.arms).map((k) => {
                      return(
                        <option>{k}</option>
                      );
                    }) }
                  </Select>
                </Control>
              </Field>
            </Column>
            <Column isSize="1/4">
              <Field>
                <Label>Pants</Label>
                <Control>
                  <Select onChange={(e) => this.equipItem(Items.male.pants[e.target.value], 'pants') }>
                    <option></option>
                    { Object.keys(Items.male.pants).map((k) => {
                      return(
                        <option>{k}</option>
                      );
                    }) }
                  </Select>
                </Control>
              </Field>
            </Column>
            <Column isSize="1/4">
              <Field>
                <Label>Boots</Label>
                <Control>
                  <Select onChange={(e) => this.equipItem(Items.male.boots[e.target.value], 'boots') }>
                    <option></option>
                    { Object.keys(Items.male.boots).map((k) => {
                      return(
                        <option>{k}</option>
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