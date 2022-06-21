import React, { ReactElement, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import MoreIcon from '@material-ui/icons/MoreVert';
import TheatersIcon from '@material-ui/icons/Theaters';
import { useSelector } from 'react-redux';

import s from './PrimarySearchAppBar.module.sass';
import { useStyles } from './useStylePrimarySearchAppBar';

import { CardFavoritesMovie, InputWrapper, MyAccordion } from 'components';
import { FavoriteCartMassage, PageOptions, ProgressOption } from 'enum';
import { useAppDispatch } from 'hooks';
import { changeTheme, isThemeIndex, myFavoritesMovies, progress } from 'store';

export const PrimarySearchAppBar = React.memo(() => {
  const classes = useStyles();

  const favoritesMovies = useSelector(myFavoritesMovies);
  const themeState = useSelector(isThemeIndex);

  const progressNow = useSelector(progress);

  const dispatch = useAppDispatch();

  const [menuDrawer, setMenuDrawer] = useState<boolean>(false);

  const numberFavoritesMovies = favoritesMovies.length - PageOptions.notFavoriteMovie;

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setMenuDrawer(open);
    };

  const list = (): ReactElement => (
    <List className={s.drawerWrapper}>
      {favoritesMovies.map(movie => {
        if (
          movie.title === '' &&
          favoritesMovies.length === PageOptions.startNumberFavoriteMovies
        ) {
          return (
            <CardFavoritesMovie
              key={movie.imdbID}
              title={FavoriteCartMassage.notFavoriteMovies}
            />
          );
        }
        if (movie.title === '') {
          return (
            <CardFavoritesMovie
              key={movie.imdbID}
              title={FavoriteCartMassage.deleteAll}
            />
          );
        }
        return <MyAccordion key={movie.imdbID} favoritesMovie={movie} />;
      })}
    </List>
  );

  const changeThemeHandler = (): void => {
    dispatch(changeTheme());
  };

  return (
    <div className={classes.grow}>
      <Drawer
        anchor="right"
        open={menuDrawer}
        onClose={toggleDrawer(false)}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      >
        {list()}
      </Drawer>
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.grow} />
          <IconButton
            aria-label="Brightness5Icon"
            color="inherit"
            onClick={changeThemeHandler}
            style={{ width: '5px', height: '5px' }}
          >
            {themeState ? <Brightness4Icon /> : <Brightness5Icon />}
          </IconButton>
          <InputWrapper />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <Badge badgeContent={numberFavoritesMovies} color="secondary">
                <TheatersIcon />
              </Badge>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <Badge badgeContent={numberFavoritesMovies} color="secondary">
                <MoreIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
        <div className={s.progressBlock}>
          {progressNow === ProgressOption.on && (
            <LinearProgress className={s.progress} color="primary" />
          )}
        </div>
      </AppBar>
    </div>
  );
});
