package com.highradius.Manager;

import java.util.ArrayList;
import java.util.List;

import com.highradius.Modal.Language;
import com.highradius.Modal.Movie;

public interface MovieManager {

	Boolean updateMovieList (Movie movieList);
	Boolean deleteMovieList(String film_id);
	ArrayList<Movie> getFeatureList();
	Boolean insertMovieList(Movie movieList);
	ArrayList<Movie> getRatingList();
	List<Language> getLanguageList();
	List<Movie> getMovieList(int start, int limit);
	List<Movie> searchMovieList(Movie movieList);
	int getRatingCount();
	int getFeaturesCount();
	int movieCount();
}
