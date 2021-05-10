package com.highradius.DaoImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.highradius.Dao.MovieDao;
import com.highradius.Modal.Language;
import com.highradius.Modal.Movie;

import net.sf.json.JSONArray;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.springframework.transaction.annotation.Transactional;

public class MovieDaoImpl implements MovieDao {

	Connection conn = null;
	PreparedStatement stmt = null;
	String sql = null;
	Boolean rowUpdated = false;
	int Featurecount = 0;
	int Ratingcount = 0;
	int searchCount = 0;
	int movieCount = 0;
	JSONArray arrayObj = null;
	ArrayList<Movie> MovieList = new ArrayList<Movie>();
	Transaction t = null;
	private SessionFactory sessionFactory;

	public MovieDaoImpl(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Transactional
	public List<Movie> getMovieList(int start, int limit) {
		List<Movie> MovieList = new ArrayList<Movie>();
		Session session = sessionFactory.getCurrentSession();
		Criteria cr = session.createCriteria(Movie.class);
		cr.add(Restrictions.eq("isDeleted", 0));
		cr.setFirstResult(start);
		cr.setMaxResults(limit);
		MovieList = cr.list();
		System.out.println(MovieList.size());
		return MovieList;

	}

	@Transactional
	public int movieCount() {

		String SQL_QUERY = "SELECT COUNT(*) FROM Movie m where m.isDeleted=0";
		long row = 0;
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createQuery(SQL_QUERY);

		for (Iterator it = query.iterate(); it.hasNext();) {
			row = (Long) it.next();
		}
		// session.getTransaction().commit();
		return (int) row;
	}

	@Transactional
	public List<Language> getLanguageList() {

		List<Language> languageList = new ArrayList<Language>();
		Session session = sessionFactory.getCurrentSession();
		Criteria cr = session.createCriteria(Language.class);
		languageList = cr.list();
		System.out.println(languageList.size());
		return languageList;

	}

	@Transactional
	public Boolean insertMovieList(Movie movieList) {
		int movieId = 0;
		Session session = sessionFactory.getCurrentSession();

		Language lang = (Language) session.load(Language.class, movieList.getLanguage().getLanguage_id());
		movieList.setLanguage(lang);
		session.save(movieList);
		return true;
	}

	@Transactional
	public Boolean updateMovieList(Movie movieList) {
		Session session = sessionFactory.getCurrentSession();

		Language lang = (Language) session.load(Language.class, movieList.getLanguage().getLanguage_id());
		movieList.setLanguage(lang);
		Movie movie = (Movie) session.get(Movie.class, movieList.getFilm_id());
		movie.setTitle(movieList.getTitle());
		movie.setDescription(movieList.getDescription());
		movie.setDirector(movieList.getDirector());
		movie.setRating(movieList.getRating());
		movie.setSpecial_features(movieList.getSpecial_features());
		movie.setLanguage(movieList.getLanguage());
		movie.setTitle(movieList.getTitle());
		movie.setRelease_year(movieList.getRelease_year());
		session.update(movie);
		return true;
	}// end main

	@Transactional
	public Boolean deleteMovieList(String film_id) {
		Session session = sessionFactory.getCurrentSession();

		String[] ids = film_id.split("[,]", 0);
		for (int i = 0; i < ids.length; i++) {
			System.out.println(ids[i]);
			int id = Integer.parseInt(ids[i]);
			Transaction t = session.beginTransaction();
			Movie movie = (Movie) session.get(Movie.class, id);
			movie.setIsDeleted(1);
			session.update(movie);
		}
		System.out.println("Goodbye!");
		return true;
	}

	public ArrayList<Movie> getFeatureList() {
		ArrayList<Movie> MovieList = new ArrayList<Movie>();

		try {
			Context ctx = (Context) new InitialContext().lookup("java:comp/env");
			conn = ((DataSource) ctx.lookup("jdbc/mysql")).getConnection();

			sql = "SELECT SUBSTRING(COLUMN_TYPE,5,LENGTH(SUBSTRING(COLUMN_TYPE,5))-1) AS enum_content FROM information_schema.COLUMNS WHERE TABLE_NAME='film' AND COLUMN_NAME='special_features'";
			stmt = conn.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();
			rs.next();
			String[] featureList = rs.getString("enum_content").split("[,]", 0);

			for (String feature : featureList) {

				Movie Movie = new Movie();
				Movie.setFilm_id(Featurecount);
				Movie.setSpecial_features(feature.substring(1, feature.length() - 1));
				MovieList.add(Movie);
				Featurecount += 1;
			}
			// System.out.println("here"+rs.getString("enum_content"));

			rs.close();
			stmt.close();
			stmt = null;

			conn.close();
			conn = null;

		} catch (Exception e) {
			System.out.println(e);
		}

		finally {

			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException sqlex) {
					// ignore -- as we can't do anything about it here
				}

				stmt = null;
			}

			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException sqlex) {
					// ignore -- as we can't do anything about it here
				}

				conn = null;
			}
		}

		return MovieList;

	}

	public int getFeaturesCount() {

		return Featurecount;

	}

	public ArrayList<Movie> getRatingList()

	{
		ArrayList<Movie> MovieList = new ArrayList<Movie>();

		try {
			Context ctx = (Context) new InitialContext().lookup("java:comp/env");
			conn = ((DataSource) ctx.lookup("jdbc/mysql")).getConnection();

			sql = "SELECT SUBSTRING(COLUMN_TYPE,6,LENGTH(SUBSTRING(COLUMN_TYPE,6))-1) AS enum_content FROM information_schema.COLUMNS WHERE TABLE_NAME='film' AND COLUMN_NAME='rating'";
			stmt = conn.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();
			rs.next();
			String[] rating = rs.getString("enum_content").split("[,]", 0);

			for (String ratingType : rating) {

				Movie Movie = new Movie();
				Movie.setFilm_id(Ratingcount);
				Movie.setRating(ratingType.substring(1, ratingType.length() - 1));
				MovieList.add(Movie);
				Ratingcount += 1;
			}
			// System.out.println("here"+rs.getString("enum_content"));

			rs.close();
			stmt.close();
			stmt = null;

			conn.close();
			conn = null;

		} catch (Exception e) {
			System.out.println(e);
		}

		finally {

			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException sqlex) {
					// ignore -- as we can't do anything about it here
				}

				stmt = null;
			}

			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException sqlex) {
					// ignore -- as we can't do anything about it here
				}

				conn = null;
			}
		}

		return MovieList;
	}

	public int getRatingCount() {

		return Ratingcount;

	}

	@Transactional
	public List<Movie> searchMovieList(Movie movieList) {
		List<Movie> MovieList = new ArrayList<Movie>();
		Session session = sessionFactory.getCurrentSession();

		Criteria cr = session.createCriteria(Movie.class);
		Criterion title = Restrictions.eq("title", movieList.getTitle());
		Criterion director = Restrictions.eq("director", movieList.getDirector());
		Criterion year = Restrictions.eq("release_year", movieList.getRelease_year());
		Criterion lang_id = Restrictions.eq("language.language_id", movieList.getLanguage().getLanguage_id());
		Criterion deleted = Restrictions.eq("isDeleted", 0);
		Disjunction disjunction = Restrictions.disjunction();
		Conjunction conjuction = Restrictions.conjunction();
		disjunction.add(title);
		disjunction.add(director);
		disjunction.add(year);
		disjunction.add(lang_id);
		conjuction.add(deleted);
		cr.add(disjunction);
		cr.add(conjuction);
		MovieList = cr.list();
		System.out.println(MovieList.size());
		return MovieList;
	}

}
