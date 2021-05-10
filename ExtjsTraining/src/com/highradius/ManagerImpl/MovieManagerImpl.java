package com.highradius.ManagerImpl;

import java.util.*;

import com.highradius.Dao.MovieDao;
import com.highradius.Manager.MovieManager;
import com.highradius.Modal.Language;
import com.highradius.Modal.Movie;

public class MovieManagerImpl implements MovieManager {
	
	private MovieDao movieDao;
	public MovieDao getMovieDao () {
		return movieDao;
	}
	public void setMovieDao (MovieDao movieDao)
	{
		this.movieDao = movieDao;
	}
	public Boolean updateMovieList (Movie movieList)
	{
		return movieDao.updateMovieList (movieList);
	}
	public Boolean deleteMovieList(String film_id)
	{
		return movieDao.deleteMovieList(film_id);
	}
	public ArrayList<Movie> getFeatureList(){
		return movieDao.getFeatureList();
		
	}
	public Boolean insertMovieList(Movie movieList)
	{
		return movieDao.insertMovieList(movieList);
	}
	public ArrayList<Movie> getRatingList()
	{
		return movieDao.getRatingList();
	}
	public List<Language> getLanguageList()
	{
		return movieDao.getLanguageList();
	}
	public List<Movie> getMovieList(int start, int limit)
	{
		return movieDao.getMovieList(start,limit);
	}
	public List<Movie> searchMovieList(Movie movieList)
	{
		return movieDao.searchMovieList(movieList);
	}
	public int movieCount()
	{
		return movieDao.movieCount();
	}
	public int getRatingCount()
	{
		return movieDao.getRatingCount();
		
	}
	public int getFeaturesCount()
	{
		return movieDao.getFeaturesCount();
	}
}
