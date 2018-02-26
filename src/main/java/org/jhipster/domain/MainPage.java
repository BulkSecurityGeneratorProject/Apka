package org.jhipster.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MainPage.
 */
@Entity
@Table(name = "main_page")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MainPage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "home_page_img")
    private byte[] homePageImg;

    @Column(name = "home_page_img_content_type")
    private String homePageImgContentType;

    @Column(name = "homepage_text")
    private String homepageText;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getHomePageImg() {
        return homePageImg;
    }

    public MainPage homePageImg(byte[] homePageImg) {
        this.homePageImg = homePageImg;
        return this;
    }

    public void setHomePageImg(byte[] homePageImg) {
        this.homePageImg = homePageImg;
    }

    public String getHomePageImgContentType() {
        return homePageImgContentType;
    }

    public MainPage homePageImgContentType(String homePageImgContentType) {
        this.homePageImgContentType = homePageImgContentType;
        return this;
    }

    public void setHomePageImgContentType(String homePageImgContentType) {
        this.homePageImgContentType = homePageImgContentType;
    }

    public String getHomepageText() {
        return homepageText;
    }

    public MainPage homepageText(String homepageText) {
        this.homepageText = homepageText;
        return this;
    }

    public void setHomepageText(String homepageText) {
        this.homepageText = homepageText;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MainPage mainPage = (MainPage) o;
        if (mainPage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mainPage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MainPage{" +
            "id=" + getId() +
            ", homePageImg='" + getHomePageImg() + "'" +
            ", homePageImgContentType='" + getHomePageImgContentType() + "'" +
            ", homepageText='" + getHomepageText() + "'" +
            "}";
    }
}
