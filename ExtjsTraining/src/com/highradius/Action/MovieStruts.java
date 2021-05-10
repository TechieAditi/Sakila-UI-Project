package com.highradius.Action;

import java.io.IOException;
import java.sql.*;
import java.util.*;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.highradius.Manager.MovieManager;
import com.highradius.Modal.Language;
import com.highradius.Modal.Movie;
import com.opensymphony.xwork2.ActionSupport;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class MovieStruts extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private int start = 0;
	private int limit = 0;
	private String description = null;
	private int release_year = -1;
	private String language_id = null;
	private String rating = null;
	private String special_features = null;
	private String director = null;
	private String film_id = null;
	private JSONObject featureList = null;
	Connection conn = null;
	PreparedStatement stmt = null;
	private JSONObject resultSet = null;
	JSONArray arrayObj = null;

	public JSONObject getResultSet() {
		return resultSet;
	}

	public void setResultSet(JSONObject resultSet) {
		this.resultSet = resultSet;
	}

	List<Movie> MovieList = new ArrayList<Movie>();
	String sql = null;

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	private String title = null;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getRelease_year() {
		return release_year;
	}

	public void setRelease_year(int release_year) {
		this.release_year = release_year;
	}

	public String getLanguage_id() {
		return language_id;
	}

	public void setLanguage_id(String language_id) {
		this.language_id = language_id;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getSpecial_features() {
		return special_features;
	}

	public void setSpecial_features(String special_features) {
		this.special_features = special_features;
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public String getFilm_id() {
		return film_id;
	}

	public void setFilm_id(String film_id) {
		this.film_id = film_id;
	}


	public void setFeatureList(JSONObject resultJSONobj) {
		this.featureList = resultJSONobj;
	}

	private JSONObject languageList = null;

	public void setLanguageList(JSONObject languageList) {
		this.languageList = languageList;
	}
	public JSONObject getFeatureList() {
		return featureList;
	}
	public Map<String, Object> getRatingList() {
		return ratingList;
	}

	public JSONObject getLanguageList() {
		return languageList;
	}

	private Map<String, Object> ratingList = null;

	public void setRatingList(Map<String, Object> resultJSONobj) {
		this.ratingList = resultJSONobj;
	}

	private JSONObject searchResultSet = null;

	public JSONObject getSearchResultSet() {
		return searchResultSet;
	}

	public void setSearchResultSet(JSONObject searchResultSet) {
		this.searchResultSet = searchResultSet;
	}

	public String getMovieList() {
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		MovieManager movieManager = (MovieManager) context.getBean("movieManager");
		List<Movie> MovieList = movieManager.getMovieList(start, limit);
		int movieCount =0;
		if(MovieList.isEmpty())
			{
			System.out.println("empty");
			}
		List<Object> list = new ArrayList();
		for (Movie  m : MovieList)
		{
			System.out.println(m.getTitle());
			HashMap<String, Object> map = new HashMap();
			map.put("film_id",m.getFilm_id());
			map.put("title",m.getTitle());
			map.put("description", m.getDescription());
			map.put("director", m.getDirector());
			map.put("rating",m.getRating());
			map.put("special_features", m.getSpecial_features());
			map.put("language_name", m.getLanguage().getName());
			map.put("release_year", m.getRelease_year());
			list.add(map);
		}
		arrayObj = new JSONArray();
		for (int i = 0; i < list.size(); i++) {
			JSONObject itemObj = JSONObject.fromObject(list.get(i));
			arrayObj.add(itemObj);
		}
		
		JSONObject myObj = new JSONObject();
		myObj.put("success", true);
		myObj.put("Movies", arrayObj);
		myObj.put("total", movieManager.movieCount());
		setResultSet(myObj);
		System.out.println(getResultSet());
		return "success";
	}

	public String insertMovies() {
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		MovieManager movieManager = (MovieManager) context.getBean("movieManager");
		// InsertMovieInformation insertMovieInformation = new InsertMovieInformation();
		System.out.println("languageid"+language_id);
		Language lang = new Language();
		lang.setLanguage_id(Integer.parseInt(language_id));
		Movie MovieList = new Movie();
		MovieList.setTitle(title);
		MovieList.setDescription(description);
		MovieList.setRelease_year(release_year);
		MovieList.setLanguage(lang);
		MovieList.setRating(rating);
		MovieList.setSpecial_features(special_features);
		MovieList.setDirector(director);
		System.out.println(MovieList.getTitle());
		if (movieManager.insertMovieList(MovieList))
			System.out.println("Inserted SuccessFully");
		else
			System.out.println("Insertion failed");
		return "success";
	}

	public String editMovieList() {
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		MovieManager movieManager = (MovieManager) context.getBean("movieManager");

		// UpdateMovieInformation updateMovieInformation = new UpdateMovieInformation();
		Language lang = new Language();
		lang.setLanguage_id(Integer.parseInt(language_id));
		Movie MovieList = new Movie();
		MovieList.setFilm_id(Integer.parseInt(film_id));
		MovieList.setTitle(title);
		MovieList.setDescription(description);
		MovieList.setRelease_year(release_year);
		MovieList.setLanguage(lang);
		MovieList.setRating(rating);
		MovieList.setSpecial_features(special_features);
		MovieList.setDirector(director);
		System.out.println(MovieList.getTitle());
		if (movieManager.updateMovieList(MovieList))
			System.out.println("Edited SuccessFully");
		else
			System.out.println("Editing failed");
		return "success";
	}

	public String deleteMovies() {
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		MovieManager movieManager = (MovieManager) context.getBean("movieManager");
		// UpdateMovieInformation updateMovieInformation = new UpdateMovieInformation();
		if (movieManager.deleteMovieList(film_id))
			System.out.println("update Successfully");
		else
			System.out.println("updation failed");
		return "success";
	}

	public String getSpecialFeatures() {
		JSONArray arrayObj = new JSONArray();
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		MovieManager movieManager = (MovieManager)context.getBean("movieManager");

		//SpecialFeaturesInformation specialFeaturesInformation = new SpecialFeaturesInformation();
		ArrayList<Movie> MovieList = movieManager.getFeatureList();
		List<Object> list = new ArrayList();
		for (Movie  m : MovieList)
		{
			HashMap<String, Object> map = new HashMap();
			map.put("special_features", m.getSpecial_features());
			list.add(map);
		}
		
		arrayObj = new JSONArray();
		for (int i = 0; i < list.size(); i++) {
			JSONObject itemObj = JSONObject.fromObject(list.get(i));
			arrayObj.add(itemObj);
		}
		System.out.println(arrayObj.toString());
		JSONObject myObj = new JSONObject();
		myObj.put("success", true);
		myObj.put("features", arrayObj);
		myObj.put("total", movieManager.getFeaturesCount());
		setFeatureList(myObj);
		System.out.println(getFeatureList());
		
	 return "success";
	}

	public String getMovieLanguage() {
		JSONArray arrayObj = new JSONArray();
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		MovieManager movieManager = (MovieManager) context.getBean("movieManager");
		// LanguageInformation languageInformation = new LanguageInformation();
		List<Language> langList = movieManager.getLanguageList();
		List<Object> list = new ArrayList();
		int langCount = 0;
		for (Language  l : langList)
		{	
			HashMap<String, Object> map = new HashMap();	
			map.put("language_name", l.getName());
			map.put("language_id", l.getLanguage_id());
			list.add(map);
			langCount++;
		}
		arrayObj = new JSONArray();
		for (int i = 0; i < list.size(); i++) {
			JSONObject itemObj = JSONObject.fromObject(list.get(i));
			arrayObj.add(itemObj);
		}

		JSONObject myObj = new JSONObject();
		myObj.put("success", true);
		myObj.put("Languages", arrayObj.toString());
		myObj.put("total", langCount);
		setLanguageList(myObj);
		System.out.println(getLanguageList());
		return "success";
	}

	public String getMovieRating() {
		JSONArray arrayObj = new JSONArray();
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		MovieManager movieManager = (MovieManager)context.getBean("movieManager");
		//RatingInformation ratingInformation = new RatingInformation();
		ArrayList<Movie> MovieList = movieManager.getRatingList();
		List<Object> list = new ArrayList();
		for (Movie  m : MovieList)
		{
			HashMap<String, Object> map = new HashMap();
			map.put("rating", m.getRating());
			list.add(map);
		}
		
		arrayObj = new JSONArray();
		for (int i = 0; i < list.size(); i++) {
			JSONObject itemObj = JSONObject.fromObject(list.get(i));
			arrayObj.add(itemObj);
		}
		System.out.println(arrayObj.toString());
		JSONObject myObj = new JSONObject();
		myObj.put("success", true);
		myObj.put("ratings", arrayObj);
		myObj.put("total", movieManager.getRatingCount());
		setRatingList(myObj);
		System.out.println(getRatingList());
		
	 return "success";
	
	}

	public String searchMovies() {

		JSONArray arrayObj = new JSONArray();
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		MovieManager movieManager = (MovieManager) context.getBean("movieManager");
		// SearchMovieInformation searchMovieInformation = new SearchMovieInformation();
		Movie MovieList = new Movie();
		Language lang = new Language();
		MovieList.setTitle(title);
		MovieList.setRelease_year(release_year);
		int lang_id = -1;
		if(language_id !=null || language_id!="" )
			lang_id=Integer.parseInt(language_id);
		lang.setLanguage_id(lang_id);
		MovieList.setDirector(director);
		MovieList.setLanguage(lang);
		System.out.println(MovieList.getRelease_year());
		System.out.println(MovieList.getTitle());
		System.out.println(lang.getLanguage_id());
		MovieList.setDirector(director);
		System.out.println(MovieList.getDirector());
		List<Movie> SearchList = movieManager.searchMovieList(MovieList);
		if(SearchList.isEmpty())
		{
		System.out.println("empty");
		}
	List<Object> list = new ArrayList();
	int Searchcount =0;
	for (Movie  m : SearchList)
	{
		System.out.println(m.getTitle());
		HashMap<String, Object> map = new HashMap();
		map.put("title",m.getTitle());
		map.put("description", m.getDescription());
		map.put("director", m.getDirector());
		map.put("rating",m.getRating());
		map.put("special_features", m.getSpecial_features());
		map.put("language_name", m.getLanguage().getName());
		map.put("release_year", m.getRelease_year());
		list.add(map);
		Searchcount++;
	}
	arrayObj = new JSONArray();
	for (int i = 0; i < list.size(); i++) {
		JSONObject itemObj = JSONObject.fromObject(list.get(i));
		arrayObj.add(itemObj);
	}
	
	JSONObject myObj = new JSONObject();
	myObj.put("success", true);
	myObj.put("Movies", arrayObj);
	myObj.put("total", Searchcount);
	setSearchResultSet(myObj);
	System.out.println(getSearchResultSet());
	return "success";
	}
}