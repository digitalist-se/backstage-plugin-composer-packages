import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { Fetch } from '../Fetch';

export const Overview = () => (
  <Page themeId="tool">
    <Header title="Library list" subtitle="Delivered with 🖤 from Digitalist.">
      <HeaderLabel label="Owner" value="OPS" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Library list">
        <SupportButton>Click for support.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title="Source">
            <Typography variant="body1">
              The index comes from scanned composer.lock files, that could mean
              that a module, plugin, library etc. is not active.
            </Typography>
          </InfoCard>
        </Grid>
        <Grid item>
          <Fetch />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
