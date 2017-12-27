import React from 'react';
import { Box, Container, Panel, PanelHeading, PanelBlock, Columns, Column, Select,
         Field, Label, Control } from 'bloomer';
import * as playerConfigs from '../../client/configs/player';

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
      stats: Object.assign({}, playerConfigs.STATS)
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

  render()
  {
    return (
      <Panel>

        <PanelHeading>Player Admin Panel</PanelHeading>

        <PanelBlock>
          <Field>
            <Label>Level: {this.state.level}</Label>
            <Control>
              <input type="range" min="1" max="80" value={this.state.level} onChange={(e) => this.setPlayerValue('level', e.target.value) } className="slider"/>
            </Control>
          </Field>
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
                  <Select>
                    <option></option>
                  </Select>
                </Control>
              </Field>
            </Column>
            <Column isSize="1/3">
              <Field>
                <Label>Back</Label>
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
            <Column isSize="1/3">
              <Field>
                <Label>Weapon</Label>
                <Control>
                  <Select>
                    <option></option>
                  </Select>
                </Control>
              </Field>
            </Column>
            <Column isSize="1/3">
              <Field>
                <Label>Body</Label>
                <Control>
                  <Select>
                    <option></option>
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
            <Column isSize="1/3">
              <Field>
                <Label>Gloves</Label>
                <Control>
                  <Select>
                    <option></option>
                  </Select>
                </Control>
              </Field>
            </Column>
            <Column isSize="1/3">
              <Field>
                <Label>Pants</Label>
                <Control>
                  <Select>
                    <option></option>
                  </Select>
                </Control>
              </Field>
            </Column>
            <Column isSize="1/3">
              <Field>
                <Label>Boots</Label>
                <Control>
                  <Select>
                    <option></option>
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